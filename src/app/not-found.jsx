// app/not-found.jsx
import Link from "next/link";
import { FaBookOpenReader } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-4 text-center dark:bg-forest-dark">
      <FaBookOpenReader className="text-6xl text-forest dark:text-sage-light" />

      <div>
        <h1 className="text-6xl font-bold text-forest-dark dark:text-cream">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-forest-dark dark:text-cream">
          Page Not Found
        </h2>
        <p className="mt-3 max-w-md text-sm text-gray-600 dark:text-sage-light">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>

      <Link href="/">
        <button className="rounded-lg bg-forest px-6 py-2.5 font-medium text-white transition hover:bg-forest-dark hover:cursor-pointer">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;