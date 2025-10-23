"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

import { cn } from "@/lib/utils";

type PolygonAnimationProps = {
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const MIN_PARTICLES = 80;
const MAX_PARTICLES = 150;
const BASE_SPEED = 0.12;
const CLICK_PARTICLES = 5;
const FRICTION = 0.94;

export default function PolygonAnimation({ className }: PolygonAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const particles = particlesRef.current;
    const pointer = pointerRef.current;

    let width = 0;
    let height = 0;

    const randomSpeed = () => (Math.random() - 0.5) * BASE_SPEED * 2;

    const createParticle = (x?: number, y?: number): Particle => ({
      x: typeof x === "number" ? x : Math.random() * width,
      y: typeof y === "number" ? y : Math.random() * height,
      vx: randomSpeed(),
      vy: randomSpeed(),
    });

    const setCanvasSize = () => {
      const { clientWidth, clientHeight } = container;
      width = clientWidth;
      height = clientHeight;
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = clientWidth * pixelRatio;
      canvas.height = clientHeight * pixelRatio;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const seedParticles = () => {
      const densityCount = Math.round((width * height) / 12000);
      const targetCount = Math.max(
        MIN_PARTICLES,
        Math.min(MAX_PARTICLES, densityCount),
      );

      particles.length = 0;
      for (let i = 0; i < targetCount; i += 1) {
        particles.push(createParticle());
      }
    };

    const renderFrame = () => {
      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(width, height) / 5 + 80;
      const pointerRadius = linkDistance * 0.75;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) {
          particle.vx *= -1;
          particle.x = Math.min(Math.max(particle.x, 0), width);
        }

        if (particle.y <= 0 || particle.y >= height) {
          particle.vy *= -1;
          particle.y = Math.min(Math.max(particle.y, 0), height);
        }

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          const radiusSquared = pointerRadius * pointerRadius;

          if (distanceSquared < radiusSquared && distanceSquared > 0.001) {
            const distance = Math.sqrt(distanceSquared);
            const force = ((pointerRadius - distance) / pointerRadius) * 0.5;
            particle.vx += (dx / distance) * force * 0.22;
            particle.vy += (dy / distance) * force * 0.22;
        }

        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
        context.fillStyle = "rgba(14, 165, 233, 0.75)";
        context.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const target = particles[j];
          const dx = particle.x - target.x;
          const dy = particle.y - target.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < linkDistance * linkDistance) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = 1 - distance / linkDistance;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(target.x, target.y);
            context.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.75})`;
            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      if (pointer.active) {
        const gradient = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          pointerRadius,
        );
        gradient.addColorStop(0, "rgba(8, 145, 178, 0.25)");
        gradient.addColorStop(0.6, "rgba(14, 165, 233, 0.12)");
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");

        context.beginPath();
        context.fillStyle = gradient;
        context.arc(pointer.x, pointer.y, pointerRadius, 0, Math.PI * 2);
        context.fill();
      }

      animationRef.current = requestAnimationFrame(renderFrame);
    };

    const handleResize = () => {
      setCanvasSize();
      seedParticles();
    };

    setCanvasSize();
    seedParticles();
    animationRef.current = requestAnimationFrame(renderFrame);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
      pointerRef.current.active = true;
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    pointerRef.current.active = false;
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const particles = particlesRef.current;
      for (let i = 0; i < CLICK_PARTICLES; i += 1) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        });
      }
      if (particles.length > MAX_PARTICLES) {
        particles.splice(
          0,
          particles.length - Math.max(MIN_PARTICLES, MAX_PARTICLES - 15),
        );
      }
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-96 w-full overflow-hidden rounded-3xl border border-sky-100/80 bg-gradient-to-br from-white via-sky-50/70 to-white shadow-lg shadow-sky-100/40",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      aria-label="Interactive polygon particle field"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.12),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(96,165,250,0.16),_transparent_70%)]" />
    </div>
  );
}
