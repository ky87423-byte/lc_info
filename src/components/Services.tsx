import { services } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

export default function Services() {
  return (
    <section id="services" className="border-b border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">서비스 안내</h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          목표에 맞는 과정을 선택하세요. 비용은 상담 시 맞춤 견적으로 안내드립니다.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <h3 className="text-lg font-bold text-red-400">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                {service.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <KakaoButton label="맞춤 견적 받기" size="lg" />
        </div>
      </div>
    </section>
  );
}
