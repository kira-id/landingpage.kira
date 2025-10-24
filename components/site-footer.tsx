import { ArrowUpRight } from "lucide-react";

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
        <div className="flex flex-col items-start gap-2 text-sm text-white/70 sm:items-end">
          <a
            href="mailto:hello@kira.id"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 font-medium text-white transition hover:border-white/40 hover:bg-white/20"
          >
            Contact us
            <ArrowUpRight className="size-4" />
          </a>
          <span className="text-xs uppercase tracking-[0.24em] text-white/60">
            hello@kira.id
          </span>
        </div>
      </div>
    </footer>
  );
}
