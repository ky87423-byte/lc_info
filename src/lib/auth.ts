// 관리자 인증 — 비밀번호 1개 + httpOnly 쿠키 세션.
// 비밀번호는 환경변수 ADMIN_PASSWORD 로 관리 (서버의 .env.local 에 설정).
import { cookies } from "next/headers";
import crypto from "node:crypto";

const PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
const COOKIE = "lc_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7일

// 쿠키에는 비밀번호 대신 해시 토큰만 저장
function token(): string {
  return crypto.createHash("sha256").update(`lc-admin::${PASSWORD}`).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE)?.value === token();
}

export async function login(password: string): Promise<boolean> {
  // 타이밍 공격 완화를 위한 상수시간 비교
  const a = Buffer.from(password);
  const b = Buffer.from(PASSWORD);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const store = await cookies();
  store.set(COOKIE, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}
