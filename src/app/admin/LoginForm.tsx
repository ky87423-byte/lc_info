"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = { error: "" };

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form
      action={action}
      className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-950 p-8"
    >
      <h1 className="text-xl font-extrabold text-red-500">관리자 로그인</h1>
      <p className="mt-1 text-sm text-zinc-500">운영현황 관리 페이지</p>

      <label className="mt-6 block text-sm text-zinc-400" htmlFor="password">
        비밀번호
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoFocus
        autoComplete="current-password"
        className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-sm outline-none focus:border-red-600"
      />

      {state.error && (
        <p className="mt-3 text-sm text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-50"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
