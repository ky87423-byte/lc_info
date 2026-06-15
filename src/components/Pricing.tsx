import { pricingPlans, pricingNotes, pricingInquiry } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">요금 안내</h2>
          <p className="mt-2 text-sm text-zinc-400">
            투명한 정찰제 · 기간이 길수록 시급이 저렴합니다.
          </p>
          <p className="mx-auto mt-5 max-w-2xl rounded-lg border border-gold/30 bg-zinc-950/50 px-4 py-2.5 text-sm font-medium text-gold/90">
            {pricingInquiry}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.period}
              className={`relative rounded-xl border p-7 ${
                plan.best
                  ? "border-red-600/60 bg-zinc-950 shadow-[0_0_30px_-12px_rgba(220,38,38,0.5)]"
                  : "border-zinc-800 bg-zinc-950"
              }`}
            >
              {plan.best && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                  시급 최저가
                </span>
              )}

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold">{plan.period}</span>
                <span className="text-sm text-zinc-400">{plan.basis}</span>
              </div>

              <div className="mt-5 flex items-baseline">
                <span className="text-4xl font-extrabold text-gold">
                  {plan.price.toLocaleString()}
                </span>
                <span className="ml-1 text-lg font-bold text-zinc-300">원</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">
                시급 {plan.hourly.toLocaleString()}원
              </p>

              <div className="mt-6">
                <KakaoButton label="카카오톡 상담" />
              </div>
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-8 max-w-md space-y-2 text-base font-medium text-zinc-300">
          {pricingNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="font-bold text-red-500">*</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
