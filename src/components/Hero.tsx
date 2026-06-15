import { site, supportedTitles } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

// public/hero/01.webp ~ 16.webp (리니지클래식 에피소드 + 추가 배경, scripts/optimize-hero.mjs 로 생성)
const HERO_IMAGE_COUNT = 16;
const SLIDE_SECONDS = 5; // 장당 노출 시간 (globals.css heroSlide 80초 = 16장 × 5초와 맞춰야 함)

// public/marks/01~03.webp (로고: 리니지클래식 · SOL enchant · AION 2, scripts/make-mark.mjs 로 생성)
const MARK_COUNT = 3;
const MARK_SECONDS = 4; // globals.css markCycle 12초 = 3장 × 4초와 맞춰야 함
const MARK_ALT: Record<number, string> = {
  1: "리니지클래식",
  2: "SOL enchant",
  3: "AION 2",
};

// 표시 순서를 무작위로 섞는다 (정적 빌드 시점에 1회 고정 — 재빌드마다 순서가 바뀜)
function shuffle(n: number) {
  const a = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Hero() {
  const order = shuffle(HERO_IMAGE_COUNT);
  const markOrder = shuffle(MARK_COUNT);
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      {/* 배경: 어두운 베이스 */}
      <div className="absolute inset-0 bg-zinc-950" aria-hidden />

      {/* 배경 슬라이드쇼 (크로스페이드, 순서 무작위) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {order.map((num, i) => (
          <div
            key={num}
            className="hero-slide"
            style={{
              backgroundImage: `url(/hero/${String(num).padStart(2, "0")}.webp)`,
              animationDelay: `${i * SLIDE_SECONDS}s`,
            }}
          />
        ))}
      </div>

      {/* 가독성 오버레이: 어둡게 + 핏빛 틴트 + 아래로 페이드(다음 섹션과 연결) */}
      <div
        className="pointer-events-none absolute inset-0 bg-zinc-950/55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.28),transparent_62%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950"
        aria-hidden
      />

      {/* 떠오르는 불티 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: `${8 + i * 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-18 text-center sm:py-24">
        {/* 로고 순환 — 리니지클래식 · SOL enchant · AION 2 (순서 무작위 크로스페이드) */}
        <div className="relative mx-auto mb-6 h-24 w-full max-w-[340px] sm:h-28 sm:max-w-[400px]">
          {markOrder.map((num, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={num}
              src={`/marks/${String(num).padStart(2, "0")}.webp`}
              alt={MARK_ALT[num]}
              className="mark-cycle drop-shadow-[0_2px_18px_rgba(0,0,0,0.7)]"
              style={{ animationDelay: `${i * MARK_SECONDS}s` }}
            />
          ))}
        </div>

        <h1 className="flex flex-col gap-4">
          <span className="text-sm font-bold tracking-[0.3em] text-red-500">
            {site.tagline} {site.brand}
          </span>
          <span className="whitespace-pre-line text-4xl font-extrabold leading-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.85)] sm:text-6xl">
            {site.heroTitle}
          </span>
        </h1>

        {/* 중세풍 장식 구분선 */}
        <div className="mx-auto mt-6 flex max-w-[18rem] items-center gap-3 text-gold/70">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-[0.6rem] leading-none">◆</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <p className="mx-auto mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-zinc-300 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)] sm:text-lg">
          {site.heroSub}
        </p>
        {/* 취급 종목 배지 — 리니지클래식 외 상담 가능 게임 (PC·모바일 강조) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          {supportedTitles.map((title) => (
            <span
              key={title}
              className="rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold shadow-[0_0_18px_-3px_rgba(201,162,39,0.6)] backdrop-blur-sm sm:text-base"
            >
              {title}
            </span>
          ))}
          <span className="text-sm font-bold text-gold/90 [text-shadow:0_0_12px_rgba(201,162,39,0.5)] sm:text-base">
            상담 가능
          </span>
        </div>

        <div className="mt-8 flex justify-center">
          <KakaoButton label="카카오톡 입소 상담" size="lg" />
        </div>
        <p className="mt-4 text-xs text-zinc-400">24시간 신속 · 친절 상담</p>
      </div>
    </section>
  );
}
