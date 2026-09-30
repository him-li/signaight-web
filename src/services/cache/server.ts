// This file must never be imported by client components.
// Optionally: import "server-only"; // if using App Router

type RedisType = (typeof import("ioredis"))["default"];

export class ServerCache {
  private redis?: InstanceType<RedisType>;
  private redisUrl =
    process.env.JINA_KUBERNETES_MODE === "true"
      ? `redis://redis.${process.env.ENVIRONMENT}.${process.env.JINA_KUBERNETES_HOSTS_SUFFIX}/0`
      : (process.env.REDIS_URI ?? process.env.NEXT_PUBLIC_REDIS_URI)!;
  private ready = false;

  private async ensure() {
    if (this.ready) return;
    // Lazy load to avoid ending up in the client bundle
    const Redis = (await import("ioredis")).default;
    // Optionally: reuse a global instance in dev to survive HMR
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = global as any;
    if (!g.__redis) {
      g.__redis =
        process.env.APP_ENV === "testing"
          ? undefined
          : new Redis(this.redisUrl);
    }
    this.redis = g.__redis;
    this.ready = true;
  }

  async reinitialize() {
    const Redis = (await import("ioredis")).default;
    this.redis =
      process.env.APP_ENV === "testing" ? undefined : new Redis(this.redisUrl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).__redis = this.redis;
    this.ready = true;
  }

  async set(key: string, value: string, ttlSeconds?: number) {
    await this.ensure();
    if (!this.redis) return;
    if (ttlSeconds && ttlSeconds > 0) {
      await this.redis.set(key, value, "EX", ttlSeconds);
    } else {
      await this.redis.set(key, value);
    }
  }

  async get(key: string) {
    await this.ensure();
    if (!this.redis) return null;
    return this.redis.get(key);
  }
}
