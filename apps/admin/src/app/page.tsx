export default function AdminHome() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
          G
        </div>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">Gytev Admin</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Console d'administration. Le tableau de bord de contenu arrive avec le
          headless CMS (Sanity) et l'authentification.
        </p>
        <a
          href="/api/health"
          className="mt-6 inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Health check
        </a>
      </div>
    </div>
  );
}
