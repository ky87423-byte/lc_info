import { trustItems } from "@/data/site";

export default function TrustSection() {
  return (
    <section className="border-b border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          데스 사관학교가 다른 이유
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          안전하게, 투명하게, 끝까지 책임집니다.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <span className="text-red-500">✓</span>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
