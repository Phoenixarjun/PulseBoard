import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/MobileHeader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daily Pulse Dashboard",
  description: "Productivity dashboard and outcome planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${notoSans.variable} font-display antialiased bg-[#f6f6f8] dark:bg-[#111621] text-slate-900 dark:text-white selection:bg-blue-600 selection:text-white overflow-hidden`}
      >
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar />

          <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10 scroll-smooth">
            <MobileHeader />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}