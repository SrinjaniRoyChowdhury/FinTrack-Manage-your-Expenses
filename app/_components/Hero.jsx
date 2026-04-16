import React from "react";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-white pt-10 lg:pt lg:grid lg:min-h-screen lg:place-content-center flex items-center flex-col">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Manage Your Expense
            <strong className="text-primary"> Control Your Money </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
            Start Creating your budget and save ton of money
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-primary-light bg-primary-light px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Replaced Inline SVG with Image Component */}
        <div className="hidden md:block">
          <Image
            src="/landing.svg"
            alt="Hero Illustration"
            width={1024}
            height={768}
            className="mx-auto max-w-md"
            priority // Suggests loading this early as it's in the hero section
          />
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Image
          src={"/dashboard.png"}
          alt="dashboard"
          width={1000}
          height={700}
          className="-mt-9 rounded-xl border-2"
        />
      </div>
    </section>
  );
}

export default Hero;
