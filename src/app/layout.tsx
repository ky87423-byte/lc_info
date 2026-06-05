import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: `${site.brand} | 리니지클래식 대리육성 전문`,
  description:
    "리니지클래식 대리육성 · 부주 · 아데나 파밍 전문. 무사고 운영, 계약서 작성, 24시간 실시간 보고. 카카오톡 상담 환영.",
  keywords: [
    "리니지클래식",
    "대리육성",
    "리니지클래식 대리육성",
    "부주",
    "아데나",
    site.brand,
  ],
  openGraph: {
    title: `${site.brand} | 리니지클래식 대리육성 전문`,
    description:
      "무사고 운영 · 계약서 작성 · 24시간 실시간 보고. 당신의 캐릭터, 정예 생도로 키워드립니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
