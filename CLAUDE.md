@AGENTS.md

# lc_info — 데스 사관학교

리니지클래식 **대리육성** 홍보 사이트. 브랜드명 **데스 사관학교 (DEATH ACADEMY)**.
린클고등학교 스타일(다크 톤 + 실시간 운영 현황판 + 신뢰 요소 강조)을 참고한 원페이지 랜딩.

- GitHub: https://github.com/ky87423-byte/lc_info
- 배포: 미배포 (Vercel 예정)

## 기술 스택

- Next.js 16.2.7 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS 4 (`@theme inline` 방식, `globals.css`)
- 폰트: Noto Sans KR (next/font/google)
- 외부 DB/API 없음 — 완전 정적 사이트 (모든 라우트 prerender)

## 핵심 규칙

1. **모든 콘텐츠는 `src/data/site.ts`에서만 수정한다.**
   브랜드명, 카톡 링크, PC 현황 수치, 신뢰 요소, 서비스, 절차, 후기, FAQ가 전부 이 파일에 있다.
   컴포넌트에 문구를 하드코딩하지 말 것.
2. 디자인 톤: 다크(zinc-950 배경) + 레드 포인트(red-500/600) + 카카오 옐로(#FEE500) CTA.
3. 컨셉 카피: 사관학교 테마 유지 — "입소 상담", "캠퍼스", "생도", "졸업(완료)".
4. 빌드 검증: `npm run build` (이 디렉토리에서). 커밋 전 빌드 통과 확인.

## 구조

```
src/
├── app/
│   ├── layout.tsx          # SEO 메타데이터 전체 (title/OG/robots/keywords)
│   ├── page.tsx            # 섹션 조립만 담당
│   ├── globals.css         # 다크 테마 CSS 변수
│   ├── sitemap.ts          # /sitemap.xml 자동 생성
│   ├── robots.ts           # /robots.txt 자동 생성
│   └── opengraph-image.tsx # OG 공유 이미지 (영문만 — ImageResponse 한글 미지원)
├── components/             # 섹션별 컴포넌트 (전부 서버 컴포넌트, client 없음)
│   ├── Header / Hero / StatusBoard / TrustSection / Services
│   ├── Process / Reviews / Faq(네이티브 details) / Footer
│   ├── KakaoButton.tsx     # 카톡 CTA 공용 버튼
│   └── JsonLd.tsx          # Organization + FAQPage 구조화 데이터
└── data/
    └── site.ts             # ★ 모든 콘텐츠/설정의 단일 소스
```

## 미완료 항목 (placeholder)

`site.ts`의 TODO 주석 참조:
- `kakaoOpenChatUrl` — 실제 카카오톡 오픈채팅 링크로 교체 필요
- `siteUrl` — 배포 후 실제 도메인으로 교체 필요 (현재 `lc-info.example.com`)
- `googleSiteVerification` — Search Console 등록 후 인증 코드 입력

## SEO 메모

- 키워드 매트릭스: {리니지클래식|리니지|린클} × {대리|대리육성|부주} — 경쟁사(로렌팀) 실사용 패턴
- meta keywords는 구글이 무시함 — 실제 노출은 푸터 해시태그(본문 텍스트), title/description, JSON-LD가 담당
- 보안 헤더는 `next.config.ts`의 `headers()`에서 관리 (5종 + poweredByHeader 제거)
