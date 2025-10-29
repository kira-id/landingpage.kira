import { ArrowUpRight, MessageCircle } from "lucide-react";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/20 bg-black/20 text-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-24">
        <div className="space-y-2 text-left">
          <p className="text-xs font-semibold tracking-[0.32em] text-white/60">
            Partner with us to shape the future of AGI.
          </p>
          <p className="text-sm leading-relaxed text-white/80">
            We are looking for serious tech investors, feel free to contact us.
          </p>
        </div>
        <div className="flex items-start gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col items-start gap-2">
            <a
              href="mailto:hello@kira.id"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-medium text-white transition hover:border-white/40 hover:bg-white/20"
            >
              Contact us
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <a
            href="https://discord.gg/TmaMMa8H"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-white/70 transition hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-6 fill-current"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 1 0-.008 0c.125-.094.25-.193.371-.291a.074.074 0 0 1 .077-.011c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.011c.12.098.246.198.372.292a.077.077 0 1 0-.006 0c-.615.466-1.252.863-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
