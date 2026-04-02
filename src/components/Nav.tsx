"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navLinks = [
  { label: "About", href: "#entry-001" },
  { label: "Work", href: "#entry-002" },
  { label: "Writing", href: "#entry-004" },
  { label: "Contact", href: "#entry-006" },
];

export default function Nav() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > 80;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-bg-primary) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border-subtle)"
            : "1px solid transparent",
        }}
      >
        <nav
          className="max-w-content mx-auto flex items-center justify-between px-8 py-4 md:py-5"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <a href="/" aria-label="PRHD — Home" className="flex items-center">
            <img
              src="/logo.svg"
              alt="PRHD logo"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-base font-medium transition-opacity duration-200 hover:opacity-100"
                style={{
                  color: "var(--color-text-primary)",
                  opacity: 0.6,
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md transition-all duration-300"
              style={{ color: "var(--color-text-secondary)" }}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300"
                style={{
                  transform: theme === "dark" ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {theme === "light" ? (
                  // Moon
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                ) : (
                  // Sun
                  <>
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-heading text-2xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { toggleTheme(); }}
            className="mt-4 font-mono text-sm px-4 py-2 rounded-md"
            style={{
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            {theme === "light" ? "◑ Dark mode" : "○ Light mode"}
          </button>
        </div>
      )}
    </>
  );
}
