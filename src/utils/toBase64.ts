// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toBase64Url(input: any): string {
  const str = typeof input === "string" ? input : JSON.stringify(input);
  const base64 = btoa(unescape(encodeURIComponent(str))); // UTF-8 → base64
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
