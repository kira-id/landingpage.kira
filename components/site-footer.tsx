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
      </div>
    </footer>
  );
}
