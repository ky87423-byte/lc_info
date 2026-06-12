// 운영현황(캠퍼스 PC·잔여석) 런타임 저장소.
// site.ts 의 campuses 를 기본값(시드)으로 쓰고, 관리자가 저장하면 .data/status.json 에 보관한다.
// VPS(next start) 환경에서 디스크에 영구 저장되며, git pull 에도 안 지워지도록 .data/ 는 gitignore.
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  campuses as defaultCampuses,
  statusUpdatedAt as defaultUpdatedAt,
  type CampusStatus,
} from "@/data/site";

export type StatusData = {
  campuses: CampusStatus[];
  updatedAt: string;
};

const FILE =
  process.env.STATUS_FILE || path.join(process.cwd(), ".data", "status.json");

function defaults(): StatusData {
  return {
    campuses: structuredClone(defaultCampuses),
    updatedAt: defaultUpdatedAt,
  };
}

export async function getStatus(): Promise<StatusData> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const data = JSON.parse(raw) as StatusData;
    if (!Array.isArray(data.campuses) || data.campuses.length === 0) {
      return defaults();
    }
    return data;
  } catch {
    return defaults();
  }
}

// 입력값을 안전하게 정제해서 저장 (음수·비정상 값 차단)
export async function saveStatus(campuses: CampusStatus[]): Promise<StatusData> {
  const clean: CampusStatus[] = campuses.map((c) => ({
    name: String(c.name ?? "").slice(0, 40) || "캠퍼스",
    totalPc: Math.max(0, Math.floor(Number(c.totalPc) || 0)),
    note: c.note ? String(c.note).slice(0, 120) : undefined,
    slots: (Array.isArray(c.slots) ? c.slots : []).map((s) => ({
      label: String(s.label ?? "").slice(0, 30) || "잔여석",
      remaining: Math.max(0, Math.floor(Number(s.remaining) || 0)),
    })),
  }));

  const data: StatusData = {
    campuses: clean,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
  return data;
}
