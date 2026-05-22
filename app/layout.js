import { Arimo } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/sonner"

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

export const metadata = {
  title: "FinTrack",
  description: "A personal finance management app built with Next.js, Tailwind CSS, and Prisma. Track your expenses, create budgets, and gain insights into your financial habits with ease.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${arimo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          {children}
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
