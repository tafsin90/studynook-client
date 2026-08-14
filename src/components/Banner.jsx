"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaBookOpenReader } from "react-icons/fa6";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-cream dark:bg-forest-dark ">
      {/* Decorative shapes */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sage-light/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-sage/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 md:flex-row md:py-24 lg:px-8">
        
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          
          {/* Small label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage-light bg-white/50 px-4 py-2 text-sm font-medium text-forest dark:border-sage dark:bg-forest/30 dark:text-sage-light">
            <FaBookOpenReader />
            <span>Your space to focus</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-forest-dark dark:text-cream sm:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="text-forest-dark dark:text-sage-light">
              Study Room
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-forest-dark/80 dark:text-cream/70 sm:text-lg">
            Browse and book quiet, private study rooms in your library.
            List your own room and earn.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center md:justify-start">
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-3 rounded-lg bg-forest px-7 py-3.5 font-semibold text-white shadow-lg shadow-forest/20 transition-all duration-300 hover:bg-sage hover:shadow-xl"
            >
              Explore Rooms

              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full max-w-xl flex-1">
          {/* Image frame */}
          <div className="absolute -bottom-8 -left-8 h-full w-full rounded-2xl border-2 border-sage-light/80" />

          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/image/banner.jpg"
              alt="Students studying together"
              width={700}
              height={500}
              priority
              className="h-[300px] w-full object-cover sm:h-[400px]"
            />

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;