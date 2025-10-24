import type { SVGProps } from "react";
import { Twitter } from "lucide-react";

function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.317 4.369a19.91 19.91 0 0 0-4.885-1.515 13.75 13.75 0 0 0-.662 1.355 18.626 18.626 0 0 0-5.541 0 13.47 13.47 0 0 0-.673-1.355 19.7 19.7 0 0 0-4.89 1.52C1.95 9.077 1.178 13.631 1.53 18.12a19.9 19.9 0 0 0 5.993 3.029 14.67 14.67 0 0 0 1.288-2.07 12.88 12.88 0 0 1-2.029-.978c.17-.123.337-.25.498-.38 3.894 1.823 8.105 1.823 11.947 0 .162.133.33.262.498.381-.646.39-1.326.718-2.031.977.356.726.784 1.41 1.277 2.053a19.87 19.87 0 0 0 6.007-3.027c.492-5.932-.838-10.44-3.659-13.386ZM8.725 15.338c-1.164 0-2.106-1.073-2.106-2.387s.93-2.387 2.106-2.387c1.185 0 2.117 1.083 2.106 2.387 0 1.314-.93 2.387-2.106 2.387Zm6.558 0c-1.164 0-2.106-1.073-2.106-2.387s.93-2.387 2.106-2.387c1.185 0 2.117 1.083 2.106 2.387 0 1.314-.92 2.387-2.106 2.387Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 lg:px-24">
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-400">
          Partner with us to shape the future of AGI.
        </span>
        <p className="max-w-3xl text-2xl font-semibold leading-relaxed text-zinc-50">
          We are looking for serious tech investors, feel free to contact us.
        </p>
        <p className="text-lg text-zinc-300">
          For any kind of inquiries, please reach out at
          {" "}
          <a
            href="mailto:hello@kira.id"
            className="font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline"
          >
            hello@kira.id
          </a>
          .
        </p>
        <div className="mt-2 flex items-center gap-4">
          <a
            href="https://discord.gg/kiraid"
            target="_blank"
            rel="noreferrer"
            aria-label="Join the Kira.id Discord"
            className="inline-flex size-11 items-center justify-center rounded-full border border-sky-400/40 text-sky-300 transition hover:border-sky-300 hover:text-sky-200"
          >
            <DiscordIcon className="size-5" />
          </a>
          <a
            href="https://twitter.com/kiraid"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow Kira.id on Twitter"
            className="inline-flex size-11 items-center justify-center rounded-full border border-sky-400/40 text-sky-300 transition hover:border-sky-300 hover:text-sky-200"
          >
            <Twitter className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
