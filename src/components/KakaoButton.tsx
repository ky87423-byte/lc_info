import { site } from "@/data/site";

export default function KakaoButton({
  label = "카카오톡 상담",
  size = "md",
}: {
  label?: string;
  size?: "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "px-8 py-4 text-lg"
      : "px-5 py-2.5 text-sm";
  return (
    <a
      href={site.kakaoOpenChatUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sizeClass} inline-flex items-center gap-2 rounded-lg bg-[#FEE500] font-bold text-[#191919] transition hover:brightness-95`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12 3C6.48 3 2 6.54 2 10.9c0 2.8 1.86 5.26 4.66 6.65-.2.75-.76 2.78-.87 3.21-.14.54.2.53.42.39.17-.11 2.72-1.85 3.82-2.6.63.09 1.29.14 1.97.14 5.52 0 10-3.54 10-7.9S17.52 3 12 3z" />
      </svg>
      {label}
    </a>
  );
}
