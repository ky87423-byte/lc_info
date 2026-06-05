import { site } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight text-red-500">
            {site.brand}
          </span>
          <span className="hidden text-xs font-medium tracking-widest text-zinc-500 sm:inline">
            {site.brandEn}
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          <a href="#status" className="transition hover:text-white">운영 현황</a>
          <a href="#services" className="transition hover:text-white">서비스</a>
          <a href="#process" className="transition hover:text-white">이용 절차</a>
          <a href="#reviews" className="transition hover:text-white">후기</a>
          <a href="#faq" className="transition hover:text-white">FAQ</a>
        </nav>
        <KakaoButton label="입소 상담" />
      </div>
    </header>
  );
}
