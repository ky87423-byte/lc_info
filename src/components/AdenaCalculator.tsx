"use client";

import { useMemo, useState } from "react";
import {
  consumablesPer12h,
  consumableHourOptions,
} from "@/data/site";
import type { AdenaRate } from "@/lib/adena";

const won = (n: number) => Math.round(n).toLocaleString("ko-KR");

export default function AdenaCalculator({ rates }: { rates: AdenaRate[] }) {
  const [server, setServer] = useState(rates[0]?.server ?? "");
  const [hours, setHours] = useState(12);

  const price = rates.find((r) => r.server === server)?.price ?? 0; // 1만 아데나당 원
  const factor = hours / 12;

  const rows = useMemo(
    () =>
      consumablesPer12h.map((c) => {
        const qty = c.qtyPer12h * factor;
        const adena = c.adenaPer12h * factor;
        const cost = (adena * price) / 10000;
        return { name: c.name, qty, cost };
      }),
    [factor, price],
  );

  const total = rows.reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      {/* 선택: 서버 + 시간 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm">
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
        </label>

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

      {/* 현재 시세 */}
      <p className="mt-3 text-xs text-zinc-500">
        {server} 시세{" "}
        <span className="font-semibold text-gold/90">
          1만 아데나 = {won(price)}원
        </span>
      </p>

      {/* 소모품 표 */}
      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-left text-xs text-zinc-500">
            <th className="py-2 font-medium">소모품</th>
            <th className="py-2 text-right font-medium">{hours}시간 소비</th>
            <th className="py-2 text-right font-medium">비용</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-zinc-800/60">
              <td className="py-2.5 text-zinc-300">{r.name}</td>
              <td className="py-2.5 text-right text-zinc-400">
                {r.qty.toLocaleString("ko-KR")}개
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
            <td className="pt-3 text-right text-lg font-extrabold text-gold">
              약 {won(total)}원
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
