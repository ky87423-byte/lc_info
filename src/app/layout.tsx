import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { site, analytics } from "@/data/site";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const title = `${site.brand} | 리니지클래식 대리육성 전문`;
const description =
  "리니지클래식 대리육성 · 부주 · 아데나 파밍 전문 데스 사관학교. 무사고 운영, 한국인 관리자 24시간 감독, 매일 실시간 보고. 카카오톡으로 맞춤 견적 상담하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.brand}`,
  },
  description,
  keywords: [
    // 핵심 매트릭스: {리니지클래식|리니지|린클} × {대리|대리육성|부주}
    "리니지클래식 대리",
    "리니지클래식 대리육성",
    "리니지클래식 부주",
    "리니지 대리",
    "리니지 대리육성",
    "리니지 부주",
    "린클 대리",
    "린클 대리육성",
    "린클 부주",
    // 보조 키워드
    "리니지클래식 육성",
    "린클 육성",
    "리니지클래식 대리육성 업체",
    "리니지클래식 24시간 부주",
    "리니지클래식 시간제 부주",
    "리니지클래식 숙제 대행",
    "리니지클래식 아데나",
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
      <body className="flex min-h-full flex-col">
        {children}
        <Script
          src={analytics.umamiSrc}
          data-website-id={analytics.umamiWebsiteId}
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}
