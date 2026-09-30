import Link from "next/link";

export default function User({ email }: { email: string }) {
  return <Link href={`mailto:${email}`}>{email}</Link>;
}
