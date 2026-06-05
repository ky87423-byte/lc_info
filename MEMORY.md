# lc_info 프로젝트 메모리

> 최종 업데이트: 2026-06-05

## 프로젝트 목적

- **무엇**: 리니지클래식 **대리육성** 서비스 홍보용 원페이지 랜딩 사이트
- **목표**: 검색(SEO) 유입 → 카카오톡 오픈채팅 상담으로 전환시키는 것이 사이트의 유일한 전환 목표
  - 업계 관행상 가격 비공개 → 모든 CTA가 카톡 상담으로 수렴
- **브랜드**: 데스 사관학교 (DEATH ACADEMY) — 사관학교 컨셉 카피 유지 (입소 상담/캠퍼스/생도/졸업)
- **참고 모델**: 린클고등학교 스타일 (다크 톤 + 실시간 PC 현황판 + 계약서·신뢰 요소 강조)
- **저장소**: https://github.com/ky87423-byte/lc_info (private 여부 확인 필요)
- **로컬**: `C:\Users\User\lc_info`

## 현재 완료된 기능 (커밋 5개, main, 워킹트리 클린)

| 기능 | 상태 | 비고 |
|---|---|---|
| 랜딩 페이지 v1 (9개 섹션) | ✅ `627527d` | Header(sticky)/Hero/StatusBoard/TrustSection(4)/Services(육성·부주·파밍·이벤트)/Process(5단계)/Reviews(3)/Faq(5, 네이티브 `<details>`)/Footer |
| 콘텐츠 단일 소스화 | ✅ | 모든 문구/수치/링크 → `src/data/site.ts` 한 파일 |
| 전 컴포넌트 서버 컴포넌트 | ✅ | client 컴포넌트 0개, 모든 라우트 정적 prerender |
| SEO 메타데이터 | ✅ `070aa24` | metadataBase/canonical/robots/OG/Twitter/title template (`layout.tsx`) |
| sitemap.xml / robots.txt | ✅ | `sitemap.ts` / `robots.ts` 자동 생성, 빌드 시 정적 출력 확인 |
| 구조화 데이터 | ✅ | `JsonLd.tsx` — Organization + FAQPage (FAQ 리치 결과 노출용) |
| OG 공유 이미지 | ✅ | `opengraph-image.tsx` — **영문만** (ImageResponse 한글 미지원) |
| 키워드 보강 | ✅ `652a70d` | 매트릭스 {리니지클래식\|리니지\|린클}×{대리\|대리육성\|부주}, meta keywords 18개 + 푸터 해시태그 17개 |
| 보안 헤더 | ✅ | `next.config.ts` headers() 5종(X-Content-Type-Options/X-Frame-Options/Referrer-Policy/Permissions-Policy/HSTS) + poweredByHeader 제거, 실제 응답 헤더로 적용 확인 |
| 프로젝트 문서 | ✅ `6bbd4d9` | CLAUDE.md / MEMORY.md / docs/worklog.md |

## 사용 중인 API

- **외부 API 없음.** 폼 전송/결제/로그인 전부 없음 — 유일한 외부 동선은 카카오톡 오픈채팅 링크(`<a href>`)
- Next.js 16.2.7 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS 4 (`@theme inline`)
- 폰트: Noto Sans KR (`next/font/google` — 빌드 시 self-host)
- StatusBoard의 "실시간" 현황은 실제 실시간이 아님 — `site.ts`의 정적 수치 + `statusUpdatedAt` 날짜 수동 갱신 방식

## DB 상태

- **DB 없음.** 완전 정적 사이트 — 모든 데이터는 `src/data/site.ts` 하드코딩
- 향후에도 DB 도입 계획 없음 (현황 수치 갱신 = site.ts 수정 후 재배포)

## 배포 상태

- ❌ **미배포** — Vercel 배포 예정 (지난 세션에서 사용자에게 제안한 상태, 미확정)
- 도메인 미구매 — `siteUrl` = `https://lc-info.example.com` (placeholder)
- Google Search Console 미등록 — `googleSiteVerification` = `""` (빈 값이면 메타태그 미출력)
- 로컬 검증만 완료: `npm run build` 통과, dev 서버 HTTP 200 확인

## 해결 안 된 문제 / placeholder

1. `kakaoOpenChatUrl` = `https://open.kakao.com/o/XXXXXXX` — **실제 오픈채팅 미개설**. 배포해도 CTA가 죽은 링크
2. `siteUrl` placeholder — canonical/OG/sitemap이 전부 가짜 도메인 기준으로 생성되는 중
3. OG 이미지 한글 불가 — ImageResponse 기본 폰트 한계. 한글 필요 시 폰트 파일 fetch 방식으로 개선 필요
4. 우사시육성단 — 검색으로 못 찾음. 사용자에게 URL 요청한 상태 (받으면 경쟁 분석 추가)
5. StatusBoard 수치 갱신 루틴 없음 — 방치하면 "실시간 현황판"의 신뢰 요소가 역효과

## 다음 작업 순서 (우선순위순)

1. **Vercel 배포** → `*.vercel.app` 주소 확보 → `siteUrl` 교체 → 재배포
2. **카카오톡 오픈채팅 개설** (사용자 액션) → `kakaoOpenChatUrl` 교체
3. **Google Search Console 등록** → 인증 코드 입력 → sitemap 제출
4. (선택) 커스텀 도메인 구매 → `siteUrl` 재교체
5. (장기) 가이드형 콘텐츠 페이지 — 린서포트 SEO 전략 (클래스별 육성 가이드 등)
6. (장기) StatusBoard 수치 정기 갱신 운영 루틴 수립

※ 1~3번은 실제 링크/계정/인증 코드가 필요 → 사용자 입력 없이는 진행 불가

## 사용자 결정 사항

- 사이트 스타일: **린클고등학교 방식** 선택 (다크 + 실시간 현황판 + 신뢰 요소)
- 브랜드명: **데스 사관학교** (사용자가 직접 지정)
- 연락 수단: **카카오톡 오픈채팅만** (전화/텔레그램 안 씀)
- 도메인: 아직 없음 — placeholder로 진행하기로 함
- 디자인 톤: zinc-950 배경 + red-500/600 포인트 + 카카오 옐로(#FEE500) CTA

## 참고 경쟁 업체

- 린클고등학교: https://xn--299a9h35r28euq8a4eg.com/ — 구조/디자인 참고 원본
- 로렌팀: https://www.xn--9i1b5dx0m0qcda032ltwli6m.com/ — 해시태그 9개 패턴 차용
- 린서포트: https://xn--9i1b5d86sca296r.com/ — 가이드형 콘텐츠 SEO 전략 (향후 참고)
- 우사시육성단: **검색으로 못 찾음** — 사용자에게 URL 요청한 상태

## 작업 시 주의

- 콘텐츠 수정은 무조건 `src/data/site.ts` — 컴포넌트 하드코딩 금지
- AGENTS.md 경고: Next.js 16은 학습 데이터와 다를 수 있음 — `node_modules/next/dist/docs/` 먼저 확인
- OG 이미지(`opengraph-image.tsx`)는 한글 렌더링 불가 (ImageResponse 기본 폰트) — 영문 유지
- 커밋 전 `npm run build` 통과 확인
- meta keywords는 구글이 무시 — 실질 SEO는 푸터 해시태그(본문 텍스트)/title/description/JSON-LD가 담당
