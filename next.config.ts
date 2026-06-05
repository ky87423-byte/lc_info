import type { NextConfig } from "next";

const securityHeaders = [
  // MIME 타입 추측 차단
  { key: "X-Content-Type-Options", value: "nosniff" },
  // iframe 삽입 차단 (클릭재킹 방지)
  { key: "X-Frame-Options", value: "DENY" },
  // 외부 사이트로 리퍼러 최소 전달
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // 사용하지 않는 브라우저 기능 차단
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // HTTPS 강제 (배포 후 적용)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // X-Powered-By 헤더 제거 (서버 정보 노출 방지)
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
