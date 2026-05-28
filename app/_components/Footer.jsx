"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={25}
                style={{ height: "auto" }}
              />
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                FinTrack
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm text-slate-500 leading-relaxed">
              Take complete command of your wealth. Create smart budgets, log
              daily expenses, and gain beautiful insights to save tons of money.
            </p>

            <div className="mt-6 flex gap-4 text-slate-400">
              <a
                href="https://www.instagram.com/nah.itz_srinjani/"
                className="hover:text-primary transition-colors text-xl"
              >
                <InstagramOutlined />
              </a>
              <a
                href="https://github.com/SrinjaniRoyChowdhury"
                className="hover:text-primary transition-colors text-xl"
              >
                <GithubOutlined />
              </a>
              <a
                href="https://www.linkedin.com/in/srinjani/"
                className="hover:text-primary transition-colors text-xl"
              >
                <LinkedinOutlined />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                Product
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/budgets"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Budgets
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/expenses"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Expenses
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                Resources
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                Legal
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-primary transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
          <p className="text-sm text-gray-600">
            Designed with{" "}
            <Heart className="inline-block w-4 h-4 text-red-500 fill-red-500 align-text-top" />{" "}
            for professional financial control.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
