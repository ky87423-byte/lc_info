"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAuthed, login, logout } from "@/lib/auth";
import { saveStatus } from "@/lib/status";
import type { CampusStatus } from "@/data/site";

export type LoginState = { error: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const ok = await login(String(formData.get("password") ?? ""));
  if (!ok) return { error: "비밀번호가 올바르지 않습니다." };
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await logout();
  redirect("/admin");
}

export async function saveStatusAction(campuses: CampusStatus[]): Promise<void> {
  if (!(await isAuthed())) throw new Error("권한이 없습니다.");
  await saveStatus(campuses);
  // 메인 운영현황과 관리자 화면을 모두 갱신
  revalidatePath("/");
  revalidatePath("/admin");
}
