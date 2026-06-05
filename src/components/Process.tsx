import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <section id="process" className="border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">이용 절차</h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          입소부터 졸업까지, 5단계로 진행됩니다.
        </p>
        <ol className="mt-12 space-y-4">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
