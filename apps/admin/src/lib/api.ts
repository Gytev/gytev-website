export const apiUrl = process.env.GYTEV_API_URL ?? "http://localhost:8000/api";
export const apiKey = process.env.GYTEV_API_KEY ?? "";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "X-API-Key": apiKey } : {}),
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`API ${response.status}: ${detail}`);
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return (await response.json()) as T;
}

export async function apiError(error: unknown): Promise<string> {
  if (error instanceof Error) return error.message;
  return "Une erreur inconnue est survenue.";
}
