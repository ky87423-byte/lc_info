import type { Metadata } from "next";
import { isAuthed } from "@/lib/auth";
import { getStatus } from "@/lib/status";
import { logoutAction } from "./actions";
import LoginForm from "./LoginForm";
import StatusEditor from "./StatusEditor";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAuthed();

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <LoginForm />
      </main>
    );
  }

  const { campuses, updatedAt } = await getStatus();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">운영현황 관리</h1>
          <p className="mt-1 text-sm text-zinc-500">
            마지막 저장일 {updatedAt} · 저장 시 메인 화면에 즉시 반영됩니다
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition hover:text-white"
          >
            로그아웃
          </button>
        </form>
      </div>

      <StatusEditor initial={campuses} />
    </main>
  );
}
