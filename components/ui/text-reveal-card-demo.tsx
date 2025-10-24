"use client";

import { motion } from "framer-motion";

import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";

export default function TextRevealCardPreview() {
  return (
    <div className="relative flex h-[40rem] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0E0E10] px-8">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          width: "100%",
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.22), transparent 60%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#0E0E10]/60"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-2xl font-semibold text-white/70">
          hover the card to reveal…
        </p>
      </motion.div>
      <TextRevealCard
        text="You know the business"
        revealText="I know the chemistry"
        className="relative z-10 w-full max-w-[32rem]"
      >
        <TextRevealCardTitle>
          Sometimes, you just need to see it.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          This is a text reveal card. Hover over the card to reveal the hidden
          text.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
