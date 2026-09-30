"use client";

import { useAppSelector } from "@/store/store";
import { getUserinfo } from "@/store/authSlice/auth.slice";

export default function Profile() {
  const user = useAppSelector(getUserinfo);
  return (
    <section>
      <h1 className="mb-3 text-xl font-bold">Profile</h1>
      <p className="mb-4 text-basic">Your locally managed account information.</p>
      <dl className="grid gap-2">
        <div><dt className="font-medium">Email</dt><dd>{user?.email}</dd></div>
        <div><dt className="font-medium">First name</dt><dd>{user?.given_name || "—"}</dd></div>
        <div><dt className="font-medium">Last name</dt><dd>{user?.family_name || "—"}</dd></div>
      </dl>
      <p className="mt-6 text-sm text-slate-500">Profile editing will be enabled in a later phase.</p>
    </section>
  );
}
