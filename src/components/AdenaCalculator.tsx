"use client";

import { useState } from "react";
import { consumablesPer12h, consumableHourOptions } from "@/data/site";
import type { AdenaRate } from "@/lib/adena";

const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
const num = (n: number) => n.toLocaleString("ko-KR");

export default function AdenaCalculator({ rates }: { rates: AdenaRate[] }) {
  const [server, setServer] = useState(rates[0]?.server ?? "");
  const [hours, setHours] = useState(12);
  // 개당 아데나(원가) — 회원이 직접 수정 가능. 기본값은 site.ts.
  const [unitAdena, setUnitAdena] = useState<number[]>(
    consumablesPer12h.map((c) => c.unitAdena),
  );

  const price = rates.find((r) => r.server === server)?.price ?? 0; // 1만 아데나당 원
  const factor = hours / 12;

  const rows = consumablesPer12h.map((c, i) => {
    const qty = c.qtyPer12h * factor;
    const unit = unitAdena[i] || 0;
    const adena = qty * unit;
    const cost = (adena * price) / 10000;
    return { name: c.name, qty, unit, adena, cost };
  });
  const total = rows.reduce((sum, r) => sum + r.cost, 0);
  const totalAdena = rows.reduce((sum, r) => sum + r.adena, 0);

  const setUnit = (i: number, raw: string) => {
    const v = Number(raw.replace(/[^0-9]/g, ""));
    setUnitAdena((prev) => prev.map((u, idx) => (idx === i ? v : u)));
  };

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      {/* 선택: 서버 + 시간 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-zinc-300">서버</span>
          <select
            value={server}
            onChange={(e) => setServer(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white focus:border-gold focus:outline-none"
          >
            {rates.map((r) => (
              <option key={r.server} value={r.server}>
                {r.server}
              </option>
            ))}
          </select>
          <span className="rounded-md bg-gold/10 px-2 py-0.5 text-xs font-bold text-gold">
            1만 아데나 {won(price)}원
          </span>
        </div>

        <div className="inline-flex rounded-lg border border-zinc-700 p-0.5">
          {consumableHourOptions.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => setHours(h)}
              className={`rounded-md px-3 py-1 text-sm font-semibold transition ${
                hours === h
                  ? "bg-red-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {h}시간
            </button>
          ))}
        </div>
      </div>

      {/* 소모품 표 — 개당 아데나(원가)는 직접 수정 가능 */}
      <table className="mt-5 w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
            <th className="py-2 font-medium">소모품</th>
            <th className="py-2 text-right font-medium">개당 아데나</th>
            <th className="py-2 text-right font-medium">비용</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className="border-b border-zinc-800/60">
              <td className="py-2.5">
                <span className="text-zinc-300">{r.name}</span>
                <span className="block text-xs text-zinc-500">
                  {hours}시간 {num(r.qty)}개
                </span>
              </td>
              <td className="py-2.5 text-right">
                <input
                  type="text"
                  inputMode="numeric"
                  value={r.unit}
                  onChange={(e) => setUnit(i, e.target.value)}
                  aria-label={`${r.name} 개당 아데나`}
                  className="w-20 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-right text-sm text-white focus:border-gold focus:outline-none"
                />
              </td>
              <td className="py-2.5 text-right font-medium text-zinc-200">
                {won(r.cost)}원
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="pt-3 font-bold text-white" colSpan={2}>
              {hours}시간 합계
            </td>
            <td className="pt-3 text-right">
              <span className="block text-xs font-medium text-zinc-400">
                {num(totalAdena)} 아데나
              </span>
              <span className="text-lg font-extrabold text-gold">
                약 {won(total)}원
              </span>
            </td>
          </tr>
        </tfoot>
      </table>

      <p className="mt-3 text-right text-xs text-zinc-500">
        개당 아데나(원가)를 직접 입력하면 비용이 계산됩니다
      </p>
    </div>
  );
}
