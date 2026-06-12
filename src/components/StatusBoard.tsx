import { getStatus } from "@/lib/status";

export default async function StatusBoard() {
  const { campuses, updatedAt } = await getStatus();
  return (
    <section id="status" className="border-b border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">실시간 운영 현황</h2>
            <p className="mt-2 text-sm text-zinc-400">
              잔여석은 상담 순서대로 배정됩니다.
            </p>
          </div>
          <span className="text-xs text-zinc-500">기준일 {updatedAt}</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {campuses.map((campus) => (
            <div
              key={campus.name}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{campus.name}</h3>
                <span className="rounded-full border border-red-900/60 bg-red-950/40 px-3 py-1 text-xs font-bold text-red-400">
                  {campus.totalPc}PC 운영
                </span>
              </div>
              <dl className="mt-5 space-y-3">
                {campus.slots.map((slot) => (
                  <div
                    key={slot.label}
                    className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3"
                  >
                    <dt className="text-sm text-zinc-400">{slot.label}</dt>
                    <dd
                      className={`text-xl font-extrabold ${
                        slot.remaining === 0 ? "text-zinc-600" : "text-white"
                      }`}
                    >
                      {slot.remaining === 0 ? "마감" : `${slot.remaining}석`}
                    </dd>
                  </div>
                ))}
              </dl>
              {campus.note && (
                <p className="mt-4 text-xs text-zinc-500">✓ {campus.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
