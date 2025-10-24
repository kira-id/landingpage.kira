"use client";

import {
  memo,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type TextRevealCardProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  revealText: string;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const TextRevealCardComponent = ({
  text,
  revealText,
  className,
  children,
  ...props
}: TextRevealCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [localWidth, setLocalWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const updateMeasurements = () => {
    if (!cardRef.current) return;
    const { left: elementLeft, width } =
      cardRef.current.getBoundingClientRect();
    setLeft(elementLeft);
    setLocalWidth(width);
  };

  useEffect(() => {
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, []);

  const updatePointer = (clientX: number) => {
    if (!localWidth) return;
    const relative = clamp((clientX - left) / localWidth);
    setWidthPercentage(relative * 100);
  };

  const handleMouseEnter = () => {
    updateMeasurements();
    setIsHovering(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updatePointer(event.clientX);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setWidthPercentage(0);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 0) return;
    updatePointer(event.touches[0].clientX);
  };

  const handleTouchStart = () => {
    updateMeasurements();
    setIsHovering(true);
  };

  const rotateDeg = (widthPercentage - 50) * 0.05;

  const overlayStyle: CSSProperties = {
    opacity: widthPercentage > 0 ? 1 : 0,
    clipPath: `inset(0 ${Math.max(0, 100 - widthPercentage)}% 0 0)`,
    left: `${widthPercentage}%`,
    transform: `rotate(${rotateDeg}deg)`,
    transitionDuration: `${isHovering ? 0 : 0.4}s`,
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#1d1c20] p-8 shadow-[0_40px_80px_-40px_rgba(56,189,248,0.45)] transition-transform duration-500 hover:shadow-[0_60px_160px_-80px_rgba(56,189,248,0.8)]",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      onTouchCancel={handleMouseLeave}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(56,189,248,0.25),transparent)] transition-all duration-300 ease-out"
        style={overlayStyle}
      />
      <div className="absolute inset-0 z-20 will-change-transform bg-[#1d1c20]/60" />
      <div className="relative overflow-hidden">
        <span
          aria-hidden="true"
          className="block translate-y-0 text-3xl font-semibold text-white/90 transition duration-500 ease-out group-hover:-translate-y-full group-hover:opacity-0 sm:text-4xl"
          style={{ textShadow: "4px 4px 15px rgba(0,0,0,0.5)" }}
        >
          {text}
        </span>
        <span
          className="absolute inset-x-0 top-0 block translate-y-full bg-gradient-to-b from-white to-neutral-300 bg-clip-text py-10 text-base font-bold text-transparent opacity-0 transition duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:text-[3rem]"
          style={{ textShadow: "4px 4px 15px rgba(0,0,0,0.5)" }}
        >
          {revealText}
        </span>
      </div>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
        {children}
      </div>
    </div>
  );
};

TextRevealCardComponent.displayName = "TextRevealCard";

export const TextRevealCard = memo(TextRevealCardComponent);

export function TextRevealCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-xl text-base text-white/80 transition-colors duration-300 group-hover:text-white/90 sm:text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TextRevealCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-xl text-sm text-white/70 transition-colors duration-300 group-hover:text-white/80 sm:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
