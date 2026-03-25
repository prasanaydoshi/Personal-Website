import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "PYD — Prasana | Developer Portfolio",
  description:
    "Engineer building at the intersection of fintech, quant, and full-stack. Portfolio of Prasana — builder, storyteller, operator.",
  keywords: [
    "developer",
    "portfolio",
    "fintech",
    "quant",
    "full-stack",
    "software engineer",
  ],
  authors: [{ name: "Prasana" }],
  openGraph: {
    title: "PYD — Prasana | Developer Portfolio",
    description:
      "Engineer building at the intersection of fintech, quant, and full-stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pyd-theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
