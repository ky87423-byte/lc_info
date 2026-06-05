import { site } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:py-32">
        <p className="mb-4 text-sm font-bold tracking-[0.3em] text-red-500">
          {site.tagline}
        </p>
        <h1 className="whitespace-pre-line text-4xl font-extrabold leading-tight sm:text-6xl">
          {site.heroTitle}
        </h1>
        <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-zinc-400 sm:text-lg">
          {site.heroSub}
        </p>
        <div className="mt-10 flex justify-center">
          <KakaoButton label="카카오톡 입소 상담" size="lg" />
        </div>
        <p className="mt-4 text-xs text-zinc-500">24시간 신속 · 친절 상담</p>
      </div>
    </section>
  );
}
