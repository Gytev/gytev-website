import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium tracking-[0.2em] text-[#666] uppercase">
        Error 404
      </p>
      <h1 className="mt-6 text-4xl font-medium tracking-tight text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-[#888]">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-[44px] items-center rounded-full border border-[#333] px-7 text-sm font-medium text-white transition-colors hover:border-white"
      >
        Return to homepage
      </Link>
    </section>
  );
}
