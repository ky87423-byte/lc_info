import { getAdenaRates } from "@/lib/adena";
import { consumableBasis, consumableNotes } from "@/data/site";
import AdenaCalculator from "@/components/AdenaCalculator";

export default async function AdenaCost() {
  const { rates, live } = await getAdenaRates();

  return (
    <section id="adena" className="border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            내 서버 소모품 비용 계산기
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            실사냥 시 들어가는 소모품 — 데스 사관학교는 <strong className="text-gold/90">전량 본주 지원</strong>으로 진행합니다.
          </p>
          <p className="mt-1 text-xs text-zinc-500">{consumableBasis}</p>
        </div>

        <AdenaCalculator rates={rates} />

        <ul className="mx-auto mt-6 max-w-xl space-y-1.5 text-xs text-zinc-500">
          {consumableNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-red-500">*</span>
              {note}
            </li>
          ))}
          <li className="flex gap-2">
            <span className="text-red-500">*</span>
            시세 출처: gamebit.co.kr (1시간마다 갱신
            {live ? "" : " · 현재 실시간 연동 일시 지연, 마지막 시세 기준"})
          </li>
        </ul>
      </div>
    </section>
  );
}
