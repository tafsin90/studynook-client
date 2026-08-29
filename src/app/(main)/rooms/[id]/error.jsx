"use client";

import Link from "next/link";

const Error = ({ error, reset }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-16 dark:bg-forest-dark">
      <div className="w-full max-w-2xl rounded-3xl border border-sage-light/40 bg-white p-8 text-center shadow-sm dark:border-sage/30 dark:bg-forest md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-sage">
          Oops!
        </p>

        <h1 className="mb-4 text-4xl font-bold text-forest-dark dark:text-cream md:text-5xl">
          Something went wrong
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg leading-7 text-forest-dark/70 dark:text-cream/70">
          We couldn’t load this page right now. Please try again or go back to
          explore our study rooms.
        </p>

        <p className="mx-auto mb-8 max-w-xl text-sm leading-7 text-red-500">
          {error.message}
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="rounded-full bg-forest px-6 py-3 font-semibold text-white transition hover:bg-sage"
          >
            Try Again
          </button>

          <Link
            href="/rooms"
            className="rounded-full border border-sage-light px-6 py-3 font-semibold text-forest transition hover:border-sage hover:text-sage dark:border-sage/50 dark:text-cream dark:hover:border-sage-light dark:hover:text-sage-light"
          >
            View All Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
