export function randomString() {
  return [...Array(5)]
    .map((it, i) => (Math.random() * 1000000).toString(36).replace(".", "") + i)
    .join("");
}
