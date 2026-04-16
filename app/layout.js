import { Geist, Geist_Mono, Arimo } from "next/font/google";
import "./globals.css";

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
      className={`${arimo.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
