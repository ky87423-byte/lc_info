import { site } from "@/data/site";
import KakaoButton from "@/components/KakaoButton";

export default function Footer() {
  return (
    <footer className="bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-xl font-extrabold sm:text-2xl">
          지금 바로 입소 상담을 받아보세요
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          캐릭터 상태와 목표만 알려주시면 맞춤 견적을 드립니다.
        </p>
        <div className="mt-6 flex justify-center">
          <KakaoButton label="카카오톡 입소 상담" size="lg" />
        </div>
        <p className="mt-12 text-xs text-zinc-600">
          © {site.establishedYear} {site.brand} ({site.brandEn}) · 리니지클래식 대리육성 전문
        </p>
        <p className="mt-2 text-xs text-zinc-700">
          #리니지클래식 #대리육성 #부주 #아데나 #리니지클래식대리 #린클육성
        </p>
      </div>
    </footer>
  );
}
