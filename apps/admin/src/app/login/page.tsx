import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_COOKIE,
  createSessionToken,
  isAuthConfigured,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";

export const metadata = { title: "Connexion" };

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

async function login(formData: FormData) {
  "use server";

  const nextPath = String(formData.get("next") ?? "/");

  if (!isAuthConfigured()) {
    redirect("/login?error=config");
  }

  const password = String(formData.get("password") ?? "");
  if (!(await verifyPassword(password))) {
    redirect(`/login?error=wrong&next=${encodeURIComponent(nextPath)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions);
  redirect(nextPath.startsWith("/") ? nextPath : "/");
}

function errorMessage(code?: string): string | null {
  if (code === "wrong") return "Mot de passe incorrect.";
  if (code === "config") return "Accès non configuré : définis ADMIN_PASSWORD et ADMIN_SESSION_SECRET.";
  return null;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;
  const message = errorMessage(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-lg font-bold tracking-[0.14em] text-zinc-100">G⅄TƎV</h1>
          <p className="mt-1 text-sm text-zinc-400">Console d&apos;administration</p>
        </div>

        <form action={login} className="mt-8 flex flex-col gap-4">
          <input type="hidden" name="next" value={next ?? "/"} />
          <div>
            <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-orange-500"
            />
          </div>

          {message ? (
            <p className="rounded-lg border border-red-900 bg-red-950 px-3 py-2 text-sm text-red-300">{message}</p>
          ) : null}

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-white py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-orange-500 hover:text-white"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
