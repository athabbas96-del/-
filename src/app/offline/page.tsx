export default function OfflinePage() {
  return (
    <main className="bg-navy flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center text-white">
      <span className="text-accent-violet font-mono text-xs tracking-[0.15em] uppercase">
        Atheer Abbas
      </span>
      <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
        You&apos;re offline — أنت غير متصل بالإنترنت
      </h1>
      <p className="max-w-[45ch] text-sm text-white/60">
        Reconnect and try again. / أعد الاتصال بالإنترنت وحاول مرة أخرى.
      </p>
    </main>
  );
}
