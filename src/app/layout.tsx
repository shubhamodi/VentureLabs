import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VentureLens — AI Investment Research Agent",
  description: "Evidence-backed preliminary investment assessment for venture capital investors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body 
        className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
