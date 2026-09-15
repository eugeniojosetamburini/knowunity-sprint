import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knowunity — Voice recall",
  description: "Voice-in/text-out active-recall prototype.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
