import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./portfolio-enhancements.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Portfolio of Kushagra Pandey: L1 infrastructure support experience, Azure certifications, active cloud/DevOps learning and earlier software-engineering projects.";

export const metadata: Metadata = {
  title: {
    default: "Kushagra Pandey | Infrastructure, Azure & Software Engineering",
    template: "%s | Kushagra Pandey",
  },
  description,
  authors: [{ name: "Kushagra Pandey" }],
  creator: "Kushagra Pandey",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Kushagra Pandey | Infrastructure, Azure & Software Engineering",
    description,
  },
  twitter: {
    card: "summary",
    title: "Kushagra Pandey | Engineering Portfolio",
    description,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
    { media: "(prefers-color-scheme: light)", color: "#F6F8FA" },
  ],
};

const themeInitScript = `
(function () {
  try {
    var saved = window.localStorage.getItem("theme");
    var theme = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
        <div className="scroll-progress" aria-hidden="true" />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div id="main-content" className="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
