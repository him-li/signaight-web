import md5 from "md5";

export function gravatarUrl(email: string) {
  const trimmed = email.trim().toLowerCase();
  const hash = md5(trimmed); // Use an MD5 library like blueimp-md5
  return `https://www.gravatar.com/${hash}`;
}
