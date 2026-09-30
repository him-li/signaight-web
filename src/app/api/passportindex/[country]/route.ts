import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { country: string } },
) {
  const path = (await params).country;

  const url = `https://cdn.henleyglobal.com/themes/hgo/public/assets/img/passports/${path?.toUpperCase()}.png`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "image/*",
      Referer: "https://www.henleyglobal.com/passport-index/compare",
    },
    next: {
      revalidate: 1728000, // 20 days
    },
  });

  if (!res.ok) {
    return new NextResponse("Image fetch failed", { status: res.status });
  }

  const buf = Buffer.from(await res.arrayBuffer());

  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/png",
      "Cache-Control": "public, max-age=1728000",
      "X-Fetched-At": new Date().toISOString(),
    },
  });
}
