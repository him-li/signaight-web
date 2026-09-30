/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import Redis from "ioredis";

let redis: Redis | undefined;

function getRedis() {
  const redisUrl = process.env.REDIS_URI ?? process.env.NEXT_PUBLIC_REDIS_URI;
  if (!redisUrl) return undefined;
  if (!redis) {
    redis = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });
    redis.on("error", () => {
      // Cache failures are non-fatal; the route can fetch directly from Mapbox.
    });
  }
  return redis;
}

const MAPBOX_BASE = "https://api.mapbox.com/styles/v1";
const DEFAULT_STYLE = "mapbox/streets-v12";

function hashKey(input: string) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

function base64UrlDecode(str: string) {
  const pad = "=".repeat((4 - (str.length % 4)) % 4);
  return Buffer.from(
    str.replace(/-/g, "+").replace(/_/g, "/") + pad,
    "base64",
  ).toString("utf8");
}

export async function GET(req: NextRequest) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Missing MAPBOX_ACCESS_TOKEN" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const center = searchParams.get("center");
  const geojson_b64 = searchParams.get("geojson_b64");
  const size = searchParams.get("size") || "500x300";
  const zoom = searchParams.get("zoom") || "13";

  if (!center) {
    return NextResponse.json({ error: "center is required" }, { status: 400 });
  }

  let overlay = "";
  if (geojson_b64) {
    const json = base64UrlDecode(geojson_b64);
    overlay = `geojson(${encodeURIComponent(json)})`;
  }

  const mapboxUrl = `${MAPBOX_BASE}/${DEFAULT_STYLE}/static/${overlay ? overlay + "/" : ""}${center},${zoom}/${size}?access_token=${token}`;
  const cacheKey = `mapbox:${hashKey(mapboxUrl)}`;
  const cache = getRedis();

  try {
    const cached = cache ? ((await cache.getBuffer(cacheKey)) as any) : null;
    if (cached) {
      return new NextResponse(cached, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {}

  // 2️⃣ Fetch from Mapbox
  const res = await fetch(mapboxUrl);
  if (!res.ok) {
    const txt = await res.text();
    return NextResponse.json({ error: txt }, { status: res.status });
  }

  const buf = Buffer.from(await res.arrayBuffer());

  try {
    await cache?.set(cacheKey, buf, "EX", 60 * 60 * 24 * 90);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
  // 3️⃣ Store in Redis for 90 days

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
