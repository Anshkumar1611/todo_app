import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "To-Do App",
  description: "todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white px-12 font-poppins ">{children}</body>
    </html>
  );
}
