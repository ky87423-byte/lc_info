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
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-zinc-700">
          #리니지클래식대리 #리니지클래식대리육성 #리니지클래식부주 #리니지대리
          #리니지대리육성 #리니지부주 #린클대리 #린클대리육성 #린클부주 #린클육성
          #리니지클래식육성 #24시간부주 #시간제부주 #숙제대행 #아데나파밍
          #리니지클래식아데나 #데스사관학교
        </p>
      </div>
    </footer>
  );
}
