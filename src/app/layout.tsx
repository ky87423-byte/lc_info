import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const title = `${site.brand} | 리니지클래식 대리육성 전문`;
const description =
  "리니지클래식 대리육성 · 부주 · 아데나 파밍 전문 데스 사관학교. 무사고 운영, 계약서 작성, 한국인 관리자 24시간 감독, 매일 실시간 보고. 카카오톡으로 맞춤 견적 상담하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.brand}`,
  },
  description,
  keywords: [
    "리니지클래식 대리육성",
    "리니지클래식 대리",
    "리니지클래식 부주",
    "리니지클래식 육성",
    "린클 대리육성",
    "린클 부주",
    "리니지 대리육성",
    "아데나 파밍",
    site.brand,
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: site.brand,
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  ...(site.googleSiteVerification && {
    verification: { google: site.googleSiteVerification },
  }),
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
