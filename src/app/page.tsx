"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import TerminalBoot from "@/components/TerminalBoot";
import ThreadSVG from "@/components/ThreadSVG";
import LogEntry from "@/components/LogEntry";
import Annotation from "@/components/Annotation";
import ProjectCard from "@/components/ProjectCard";
import ProjectRow from "@/components/ProjectRow";
import BlogPreview from "@/components/BlogPreview";
import ContactBlock from "@/components/ContactBlock";
import ParticleConstellation from "@/components/ParticleConstellation";

// ── Placeholder data (replace with your real content) ──────────────

const featuredProjects = [
  {
    title: "Insurance Limit Prediction Model",
    context:
      "At HSB (Munich Re), underwriters relied on manual heuristics to set insurance limits — a slow, inconsistent process that left money on the table and introduced risk.",
    approach:
      "Built a LightGBM ensemble model with SHAP explainability, fed by a cleaned pipeline of 50k+ policy records. Designed feature engineering around loss history, exposure metrics, and industry codes. Iterated weekly with underwriting stakeholders to calibrate outputs.",
    outcome:
      "Reduced prediction error from 19% MAPE to 7% MAPE — adopted by the underwriting team as the default recommendation engine.",
    tech: ["Python", "LightGBM", "SHAP", "SQL", "Azure ML"],
    metrics: [
      { label: "MAPE improvement", value: "19% → 7%" },
      { label: "Records processed", value: "50,000+" },
    ],
  },
  {
    title: "Reddit Sentiment Analysis Platform",
    context:
      "Needed a way to gauge real-time public sentiment across subreddits for market and brand analysis — no existing internal tool supported this at scale.",
    approach:
      "Built a full-stack pipeline that ingests subreddit data via the Reddit API, runs inference through a fine-tuned DistilBERT model, and stores results in PostgreSQL. Created a React dashboard for trend visualization and filtering by subreddit, time range, and sentiment polarity.",
    outcome:
      "Deployed a working end-to-end platform capable of processing thousands of posts per hour with real-time sentiment scoring and interactive dashboards.",
    tech: ["Python", "React", "HuggingFace", "PostgreSQL", "FastAPI"],
    metrics: [
      { label: "Throughput", value: "1,000+ posts/hr" },
      { label: "Model", value: "Fine-tuned DistilBERT" },
    ],
  },
  {
    title: "Automated Reporting Pipeline",
    context:
      "Monthly reporting at HSB required analysts to manually pull data from multiple sources, format spreadsheets, and update Power BI dashboards — consuming 150+ person-hours monthly.",
    approach:
      "Designed an end-to-end Python pipeline integrating SQL Server, Azure Data Factory, and Power BI APIs. Built parameterized report templates and a scheduling layer that runs automatically on the first of each month.",
    outcome:
      "Saved 150+ person-hours per month and eliminated manual formatting errors. Reports now auto-generate and land in stakeholder inboxes by 9 AM.",
    tech: ["Python", "SQL Server", "Azure", "Power BI", "Pandas"],
    metrics: [
      { label: "Hours saved monthly", value: "150+" },
      { label: "Error rate", value: "→ 0 manual errors" },
    ],
  },
];

const otherProjects = [
  {
    name: "Stock Analysis Dashboard",
    description: "Multi-security analysis across 44+ equities with ML predictions",
    tech: ["Python", "Plotly", "scikit-learn"],
    href: "#",
    external: false,
  },
  {
    name: "Reddit Sentiment Pipeline",
    description: "Real-time sentiment analysis using DistilBERT on subreddit data",
    tech: ["Python", "HuggingFace", "PostgreSQL"],
    href: "#",
    external: false,
  },
  {
    name: "Data Anonymization Tool",
    description: "PII detection and masking engine for insurance datasets",
    tech: ["Python", "Presidio", "Azure"],
    href: "#",
    external: false,
  },
];

const blogPosts = [
  {
    title: "Why Good Software Starts with the User, Not the Stack",
    excerpt:
      "Most dev portfolios showcase technologies. But the best software I've built started from a frustration, not a framework. Here's how I think about building things that matter.",
    date: "2026-02-20",
    dateFormatted: "Feb 20, 2026",
    category: "Engineering",
    href: "/blog/user-centric-software",
  },
  {
    title: "From Dive Logs to Data Pipelines: What Scuba Taught Me About Systems",
    excerpt:
      "At 30 meters, you can't improvise. Every dive has a plan, a backup, and a checklist. It turns out, that's also how you build reliable data infrastructure.",
    date: "2026-02-10",
    dateFormatted: "Feb 10, 2026",
    category: "Thinking",
    href: "/blog/diving-and-systems",
  },
  {
    title: "A Generalist's Guide to Technical Interviews",
    excerpt:
      "When your background spans ML, full-stack, and quant — how do you prepare for interviews that want you to be a specialist? My approach after 30+ mock interviews.",
    date: "2026-01-28",
    dateFormatted: "Jan 28, 2026",
    category: "Career",
    href: "/blog/generalist-interviews",
  },
];

// ── Main Page Component ────────────────────────────────────────────

export default function Home() {
  const [terminalDone, setTerminalDone] = useState(false);

  return (
    <>
      <Nav />
      <ScrollProgressBar />
      <ThreadSVG />

      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        {/* ============================================================
            ENTRY 000 — Hero / Boot
            ============================================================ */}
        <section className="min-h-[100vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-16 max-w-content mx-auto relative overflow-hidden">
          {/* Particle background — desktop only */}
          <ParticleConstellation className="absolute inset-0 z-0 hidden md:block" />

          <div className="relative z-10">
          <TerminalBoot onComplete={() => setTerminalDone(true)} />

          {/* CTA buttons — fade in after intro */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 max-w-[640px] mx-auto"
            style={{
              opacity: terminalDone ? 1 : 0,
              transform: terminalDone ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-md text-base font-medium transition-all duration-200 hover:-translate-y-[1px]"
              style={{
                backgroundColor: "#7BBDA4",
                color: "#1a1a1a",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              Download Resume
            </a>
            <a
              href="#entry-006"
              className="px-6 py-3 rounded-md text-base font-medium transition-all duration-200"
              style={{
                border: "1px solid var(--color-border-default)",
                color: "var(--color-text-primary)",
              }}
            >
              Get in Touch
            </a>
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-auto pt-12 flex justify-center transition-all duration-700"
            style={{
              opacity: terminalDone ? 0.5 : 0,
              transitionDelay: "600ms",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                Scroll
              </span>
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                className="animate-bounce"
                style={{ animationDuration: "2s" }}
              >
                <path
                  d="M8 4v12M4 12l4 4 4-4"
                  stroke="var(--color-text-tertiary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          </div>
        </section>

        {/* ============================================================
            ENTRY 001 — About / Signal
            ============================================================ */}
        <LogEntry
          number="001"
          id="entry-001"
          title="About"
          aside={
            <div className="space-y-4 lg:mt-12">
              <Annotation type="note" label="Current">
                Data Analyst @ Munich Re
              </Annotation>
              <Annotation type="note" label="Education">
                CS @ University of Waterloo & BBA @ Wilfrid Laurier University
              </Annotation>
              <Annotation type="note" label="Beyond code">
                NAUI Master Scuba Diver · 120+ logged dives
              </Annotation>
            </div>
          }
        >
          <div className="space-y-5">
            <p
              className="text-md leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              Hi, I&apos;m Prasana. I study Computer Science at the University of
              Waterloo and Business at Wilfrid Laurier University. I love building
              things that drive impact and help stakeholders. Currently, I am
              interning at Munich Re.
            </p>
            <p
              className="text-md leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Outside of work, I enjoy exploring new AI tools, teaching scuba
              diving as a TA, or spending time at the gym. I also love keeping
              up with equities, investing, and the latest consumer tech.
            </p>
          </div>
        </LogEntry>

        {/* ============================================================
            ENTRY 002 — Deep Dives (Featured Projects)
            ============================================================ */}
        <LogEntry number="002" id="entry-002" title="Deep Dives">
          <div className="space-y-16">
            {featuredProjects.map((project, i) => (
              <ProjectCard
                key={i}
                {...project}
              />
            ))}
          </div>
        </LogEntry>

        {/* ============================================================
            ENTRY 003 — Index (Other Projects)
            ============================================================ */}
        <LogEntry number="003" id="entry-003" title="Index">
          <div className="relative">
            {otherProjects.map((project, i) => (
              <ProjectRow key={i} {...project} />
            ))}
          </div>
        </LogEntry>

        {/* ============================================================
            ENTRY 004 — Transmissions (Blog)
            ============================================================ */}
        <LogEntry
          number="004"
          id="entry-004"
          title="Transmissions"
          aside={
            <div className="lg:mt-12">
              <Annotation type="note">
                Thoughts on engineering, investing, and building things that
                matter. Updated occasionally.
              </Annotation>
            </div>
          }
        >
          <BlogPreview posts={blogPosts} />
        </LogEntry>

        {/* ============================================================
            ENTRY 005 — Beyond the Terminal
            ============================================================ */}
        <LogEntry
          number="005"
          id="entry-005"
          title="Away from the Screen"
          aside={
            <div className="space-y-4 lg:mt-12">
              <Annotation type="metric" label="Dives logged">
                120+
              </Annotation>
              <Annotation type="metric" label="Current pursuit">
                Private pilot licence
              </Annotation>
              <Annotation type="metric" label="Stage background">
                Regional theatre
              </Annotation>
            </div>
          }
        >
          <p
            className="text-md leading-relaxed"
            style={{ color: "var(--color-text-primary)" }}
          >
            I am usually doing something that gets me out of routine. In the summers,
            that often means diving, and lately it also means working toward my private
            pilot licence. I have also spent a big part of my life around public
            speaking and theatre, with years of performing in regional plays shaping how
            I communicate and carry myself. Beyond that, I enjoy hiking, travelling, and
            exploring new places whenever I get the chance.
          </p>
        </LogEntry>

        {/* ============================================================
            ENTRY 006 — Coordinates (Contact)
            ============================================================ */}
        <LogEntry number="006" id="entry-006" title="Coordinates">
          <ContactBlock />
        </LogEntry>

        {/* ============================================================
            Footer / Colophon
            ============================================================ */}
        <footer className="py-12 text-center">
          <p
            className="font-mono text-sm"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            {"> end of log. // PRHD"}
          </p>
          <p
            className="font-mono text-[11px] mt-3"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Built with Next.js · Deployed on Vercel ·{" "}
            {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </>
  );
}
