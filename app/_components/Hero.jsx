"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function Hero() {
  const { isSignedIn } = useUser();

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
            <Link
              className="inline-block rounded border border-primary-light bg-primary-light px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#0c4d06]"
              href={isSignedIn ? "/dashboard" : "/sign-in"}
            >
              Get Started
            </Link>
          </div>

          {/* Premium Animated Counter Stats Strip */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex gap-6 sm:gap-10">
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <h3 className="text-2xl sm:text-3xl font-black bg-amber-500 bg-clip-text text-transparent">10K+</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Active Users</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <h3 className="text-2xl sm:text-3xl font-black bg-amber-300 bg-clip-text text-transparent">₹5Cr+</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Expenses Logged</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 cursor-default">
              <h3 className="text-2xl sm:text-3xl font-black bg-amber-500 bg-clip-text text-transparent">99.9%</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">SLA Accuracy</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Image
            src="/landing.svg"
            alt="Hero Illustration"
            width={1024}
            height={768}
            className="mx-auto max-w-md"
            priority 
          />
        </div>
      </div>

      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="relative group -mt-9 rounded-2xl p-1 bg-gradient-to-b from-primary-light/40 to-primary-lighter/10 shadow-2xl transition-all duration-700 ease-out hover:shadow-[0_20px_60px_rgba(134,181,80,0.25)] hover:scale-[1.01] max-w-5xl">
          {/* Soft ambient background glow */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary-light/10 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          
          <Image
            src="/dashboardpage.png"
            alt="Dashboard Preview"
            width={1100}
            height={700}
            className="rounded-xl border border-white/20 bg-white/40 shadow-inner backdrop-blur-xs transition-all"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
