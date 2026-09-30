const mem = new Map<string, { v: string; exp?: number }>();

export class BrowserCache {
  async set(key: string, value: string, ttlSeconds?: number) {
    const exp = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    mem.set(key, { v: value, exp });
    try {
      localStorage.setItem(key, JSON.stringify({ v: value, exp }));
    } catch {}
  }

  async get(key: string) {
    // Check memory first
    const m = mem.get(key);
    if (m) {
      if (m.exp && m.exp < Date.now()) {
        mem.delete(key);
        try {
          localStorage.removeItem(key);
        } catch {}
        return null;
      }
      return m.v;
    }
    // Fallback to localStorage
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { v, exp } = JSON.parse(raw);
      if (exp && exp < Date.now()) {
        localStorage.removeItem(key);
        return null;
      }
      mem.set(key, { v, exp });
      return v;
    } catch {
      return null;
    }
  }
}
