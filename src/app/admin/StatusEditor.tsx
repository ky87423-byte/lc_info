"use client";

import { useState, useTransition } from "react";
import type { CampusStatus } from "@/data/site";
import { saveStatusAction } from "./actions";

const numClass =
  "w-24 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-red-600";
const textClass =
  "flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-red-600";

function toInt(v: string) {
  return Math.max(0, Math.floor(Number(v) || 0));
}

export default function StatusEditor({
  initial,
}: {
  initial: CampusStatus[];
}) {
  const [campuses, setCampuses] = useState<CampusStatus[]>(
    structuredClone(initial),
  );
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function patchCampus(ci: number, patch: Partial<CampusStatus>) {
    setSaved(false);
    setCampuses((cs) => cs.map((c, i) => (i === ci ? { ...c, ...patch } : c)));
  }
  function patchSlot(
    ci: number,
    si: number,
    patch: Partial<CampusStatus["slots"][number]>,
  ) {
    setSaved(false);
    setCampuses((cs) =>
      cs.map((c, i) =>
        i === ci
          ? {
              ...c,
              slots: c.slots.map((s, j) =>
                j === si ? { ...s, ...patch } : s,
              ),
            }
          : c,
      ),
    );
  }
  function addSlot(ci: number) {
    setSaved(false);
    setCampuses((cs) =>
      cs.map((c, i) =>
        i === ci
          ? { ...c, slots: [...c.slots, { label: "잔여석", remaining: 0 }] }
          : c,
      ),
    );
  }
  function removeSlot(ci: number, si: number) {
    setSaved(false);
    setCampuses((cs) =>
      cs.map((c, i) =>
        i === ci ? { ...c, slots: c.slots.filter((_, j) => j !== si) } : c,
      ),
    );
  }
  function addCampus() {
    setSaved(false);
    setCampuses((cs) => [
      ...cs,
      { name: "새 캠퍼스", totalPc: 0, slots: [{ label: "잔여석", remaining: 0 }] },
    ]);
  }
  function removeCampus(ci: number) {
    setSaved(false);
    setCampuses((cs) => cs.filter((_, i) => i !== ci));
  }

  function save() {
    setSaved(false);
    start(async () => {
      await saveStatusAction(campuses);
      setSaved(true);
    });
  }

  return (
    <div className="space-y-6">
      {campuses.map((c, ci) => (
        <div
          key={ci}
          className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={c.name}
              onChange={(e) => patchCampus(ci, { name: e.target.value })}
              className={textClass}
              placeholder="캠퍼스 이름"
            />
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              운영 PC
              <input
                type="number"
                min={0}
                value={c.totalPc}
                onChange={(e) =>
                  patchCampus(ci, { totalPc: toInt(e.target.value) })
                }
                className={numClass}
              />
            </label>
            <button
              type="button"
              onClick={() => removeCampus(ci)}
              className="ml-auto text-xs text-zinc-500 transition hover:text-red-400"
            >
              캠퍼스 삭제
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-zinc-500">잔여석 항목</p>
            {c.slots.map((s, si) => (
              <div key={si} className="flex items-center gap-3">
                <input
                  value={s.label}
                  onChange={(e) =>
                    patchSlot(ci, si, { label: e.target.value })
                  }
                  className={textClass}
                  placeholder="항목명 (예: AM 타임 잔여)"
                />
                <input
                  type="number"
                  min={0}
                  value={s.remaining}
                  onChange={(e) =>
                    patchSlot(ci, si, { remaining: toInt(e.target.value) })
                  }
                  className={numClass}
                />
                <span className="text-sm text-zinc-500">석</span>
                <button
                  type="button"
                  onClick={() => removeSlot(ci, si)}
                  className="text-xs text-zinc-500 transition hover:text-red-400"
                >
                  삭제
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSlot(ci)}
              className="text-xs text-zinc-400 transition hover:text-white"
            >
              + 잔여석 항목 추가
            </button>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-zinc-500">비고</label>
            <input
              value={c.note ?? ""}
              onChange={(e) => patchCampus(ci, { note: e.target.value })}
              className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm outline-none focus:border-red-600"
              placeholder="예: 한국인 관리자 직접 감독"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCampus}
        className="w-full rounded-xl border border-dashed border-zinc-700 py-3 text-sm text-zinc-400 transition hover:border-zinc-500 hover:text-white"
      >
        + 캠퍼스 추가
      </button>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
        {saved && <span className="text-sm text-green-400">✓ 저장됨 · 메인에 반영되었습니다</span>}
      </div>
    </div>
  );
}
