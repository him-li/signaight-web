"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.detail ?? "Authentication failed");
      }
      window.location.href = "/en";
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  const registering = mode === "register";
  return (
    <main className="min-h-screen grid place-items-center bg-slate-950 px-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold text-slate-900">
          {registering ? "Create your SignAIght account" : "Sign in to SignAIght"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Local account authentication</p>
        {registering && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <input name="first_name" placeholder="First name" className="rounded-lg border p-3" />
            <input name="last_name" placeholder="Last name" className="rounded-lg border p-3" />
          </div>
        )}
        <input name="email" type="email" required autoComplete="email" placeholder="Email" className="mt-4 w-full rounded-lg border p-3" />
        <input name="password" type="password" required minLength={8} autoComplete={registering ? "new-password" : "current-password"} placeholder="Password" className="mt-3 w-full rounded-lg border p-3" />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-lg bg-slate-900 p-3 font-medium text-white disabled:opacity-50">
          {loading ? "Please wait…" : registering ? "Create account" : "Sign in"}
        </button>
        <p className="mt-5 text-center text-sm text-slate-600">
          {registering ? "Already have an account? " : "Need an account? "}
          <Link className="font-medium underline" href={registering ? "/login" : "/register"}>
            {registering ? "Sign in" : "Register"}
          </Link>
        </p>
      </form>
    </main>
  );
}
