"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
};

export default function Starfield({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let frameId = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      // A Rolls-Royce starlight headliner: hundreds of small, crisp,
      // consistently bright fiber-optic points densely covering the whole
      // surface — not a sparse, dim scattering. Almost every point reads
      // clearly at a glance; only a light twinkle (never dimming much)
      // keeps it from looking static.
      const area = width * height;
      const count = Math.min(650, Math.round((area / 2200) * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.5 + 0.5,
        baseAlpha: Math.random() * 0.25 + 0.7,
        twinkleSpeed: Math.random() * 0.5 + 0.12,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = reduceMotion
          ? 1
          : 0.85 + 0.15 * Math.sin(time * 0.001 * star.twinkleSpeed + star.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(244, 245, 249, ${star.baseAlpha * twinkle})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduceMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
