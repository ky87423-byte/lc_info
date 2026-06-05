import { faqs } from "@/data/site";

export default function Faq() {
  return (
    <section id="faq" className="border-b border-zinc-800">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          자주 묻는 질문
        </h2>
        <div className="mt-12 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-bold marker:content-none">
                <span>Q. {faq.q}</span>
                <span className="text-zinc-500 transition group-open:rotate-180">⌄</span>
              </summary>
              <p className="border-t border-zinc-800 px-5 py-4 text-sm leading-relaxed text-zinc-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
