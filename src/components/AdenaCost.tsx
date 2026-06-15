import { getAdenaRates } from "@/lib/adena";
import { consumableBasis, consumableNotes } from "@/data/site";
import AdenaCalculator from "@/components/AdenaCalculator";

export default async function AdenaCost() {
  const { rates } = await getAdenaRates();

  return (
    <section id="adena" className="border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            내 서버 소모품 비용 계산기
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base font-bold text-gold sm:text-lg">
            {consumableBasis}
          </p>
          <p className="mt-1.5 text-sm text-zinc-400">
            열랩모드에서만 소비되는 비용이며, 참고용입니다.
          </p>
        </div>

        <AdenaCalculator rates={rates} />

        <ul className="mx-auto mt-6 max-w-xl space-y-2 text-base font-medium text-zinc-300">
          {consumableNotes.map((note) => (
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
