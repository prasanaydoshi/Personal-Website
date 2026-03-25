"use client";

import { useEffect, useRef } from "react";

interface ParticleConstellationProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: [number, number, number];
  radius: number;
}

const PARTICLE_COLORS: [number, number, number][] = [
  [123, 189, 164], // teal
  [212, 169, 138], // warm
  [140, 184, 212], // sky
];

const PARTICLE_COUNT = 30;
const CONNECTION_DISTANCE = 110;
const MOUSE_RADIUS = 120;
const TEXT_ZONE = { xOffset: 30, widthPx: 520, yPercent: 0.2, heightPercent: 0.55 };

function isInTextZone(x: number, y: number, canvasH: number): boolean {
  const zoneY = canvasH * TEXT_ZONE.yPercent;
  const zoneH = canvasH * TEXT_ZONE.heightPercent;
  return x > TEXT_ZONE.xOffset && x < TEXT_ZONE.xOffset + TEXT_ZONE.widthPx && y > zoneY && y < zoneY + zoneH;
}

function spawnParticle(w: number, h: number): Particle {
  let x: number, y: number;
  let attempts = 0;
  do {
    x = Math.random() * w;
    y = Math.random() * h;
    attempts++;
  } while (isInTextZone(x, y, h) && attempts < 50);

  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    radius: 1.3 + Math.random() * 1.5,
  };
}

export default function ParticleConstellation({ className }: ParticleConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let animId: number;
    let mouseX = -9999;
    let mouseY = -9999;

    const particles: Particle[] = [];

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas!.width = w * 2;
      canvas!.height = h * 2;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.scale(2, 2);
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(spawnParticle(w, h));
      }
    }

    function getThemeParams() {
      const theme = document.documentElement.getAttribute("data-theme");
      const isDark = theme === "dark";
      return {
        baseAlpha: isDark ? 0.35 : 0.25,
        lineFactor: isDark ? 0.07 : 0.12,
      };
    }

    function draw() {
      const { baseAlpha, lineFactor } = getThemeParams();
      ctx!.clearRect(0, 0, w, h);

      const zoneY = h * TEXT_ZONE.yPercent;
      const zoneH = h * TEXT_ZONE.heightPercent;
      const zoneCX = TEXT_ZONE.xOffset + TEXT_ZONE.widthPx / 2;
      const zoneCY = zoneY + zoneH / 2;

      // Update particles
      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off edges
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          p.x = Math.max(0, Math.min(w, p.x));
          p.y = Math.max(0, Math.min(h, p.y));

          // Text zone avoidance
          if (isInTextZone(p.x, p.y, h)) {
            const dx = p.x - zoneCX;
            const dy = p.y - zoneCY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            p.vx += (dx / dist) * 0.07;
            p.vy += (dy / dist) * 0.07;
          }

          // Clamp velocity
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.8) {
            p.vx = (p.vx / speed) * 0.8;
            p.vy = (p.vy / speed) * 0.8;
          }
        }
      }

      // Connection lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = lineFactor * (1 - dist / CONNECTION_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(123, 189, 164, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw particles and mouse interaction
      for (const p of particles) {
        let radiusBoost = 0;
        let alphaBoost = 0;

        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < MOUSE_RADIUS) {
          const proximity = 1 - mDist / MOUSE_RADIUS;
          radiusBoost = proximity * 3;
          alphaBoost = proximity * 0.4;

          // Glow
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.radius + radiusBoost * 8, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${proximity * 0.08})`;
          ctx!.fill();

          // Connection line to cursor
          const lineAlpha = lineFactor * proximity;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouseX, mouseY);
          ctx!.strokeStyle = `rgba(123, 189, 164, ${lineAlpha})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();
        }

        // Particle dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius + radiusBoost, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${baseAlpha + alphaBoost})`;
        ctx!.fill();
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    init();

    if (reducedMotion) {
      draw();
    } else {
      animId = requestAnimationFrame(draw);
    }

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });
    resizeObserver.observe(canvas.parentElement!);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}
