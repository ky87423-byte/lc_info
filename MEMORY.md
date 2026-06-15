# lc_info 프로젝트 메모리

> 최종 업데이트: 2026-06-15

## 프로젝트 목적

- **무엇**: 리니지클래식 **대리육성** 서비스 홍보용 원페이지 랜딩 사이트
- **목표**: 검색(SEO) 유입 → 카카오톡 오픈채팅 상담으로 전환 (사이트 유일한 전환 목표)
  - 업계 관행상 가격 비공개였으나 현재는 **요금표 공개**(7일/30일) + 카톡 상담 병행
- **브랜드**: 데스 사관학교 (DEATH ACADEMY) — 사관학교 컨셉 카피 유지 (입소 상담/캠퍼스/생도/졸업)
- **참고 모델**: 린클고등학교 스타일 (다크 톤 + 실시간 PC 현황판 + 신뢰 요소 강조)
- **저장소**: https://github.com/ky87423-byte/lc_info (main 브랜치)
- **로컬**: `C:\Users\User\lc_info`
- **라이브**: https://gameboostforge.com (배포 완료)

## 배포 상태 ★ (다음 세션 핵심)

- ✅ **배포 완료** — Shinjiru VPS(`111.90.148.135`) + 도메인 `gameboostforge.com`, HTTPS(Let's Encrypt).
  - 구성: `next start`(포트 3000) + PM2(프로세스명 `lc_info`) + Nginx 리버스 프록시 + Certbot.
  - 정적 export 아님 — `/admin` 동적 + 서버액션 사용 때문에 Node 서버로 구동.
  - 서버 코드 경로: `/var/www/lc_info`. **SSH 포트 `20203`**(22 아님).
  - 같은 VPS에 lc_vn(gmhm365.com, 포트 3001) co-host.
- **배포 명령 (이거 그대로 사용)**:
  ```
  ssh -i "$env:USERPROFILE\.ssh\lc_info_deploy" -o IdentitiesOnly=yes -o BatchMode=yes -p 20203 root@111.90.148.135 "cd /var/www/lc_info && git pull && npm run build && pm2 reload lc_info"
  ```
  - 무비밀번호 키 = `C:\Users\User\.ssh\lc_info_deploy`(passphrase 없음). 기본 `ssh`는 passphrase 걸린 `id_ed25519`를 먼저 시도해 막히므로 **반드시 `-i`+`IdentitiesOnly=yes`** 지정.
  - 의존성 바뀌었을 때만 `npm ci` 추가. 검증: `curl https://gameboostforge.com` → 200.
  - PM2 startup(systemd) 등록 완료 → 재부팅 시 자동복구됨.
- ⚠️ 서버 `/var/www/lc_info/.env.local`의 `ADMIN_PASSWORD` 필수(없으면 `/admin`이 기본값 changeme로 뚫림). gitignore라 배포 안 됨.

## 현재 완료된 기능

| 기능 | 비고 |
|---|---|
| 랜딩 페이지 (섹션) | Header(sticky)/Hero/StatusBoard/TrustSection/Services/**Pricing**/Process/Reviews/Faq/Footer |
| 콘텐츠 단일 소스화 | 모든 문구/수치/링크 → `src/data/site.ts` (단, `/admin` 운영현황은 `.data/status.json`) |
| SEO 메타데이터 | metadataBase/canonical/robots/OG/Twitter/title (`layout.tsx`) |
| sitemap.xml / robots.txt / JsonLd | 자동 생성 (Organization + FAQPage) |
| 보안 헤더 | `next.config.ts` headers() 5종 + poweredByHeader 제거 |
| 카카오톡 CTA | `kakaoOpenChatUrl` = `https://open.kakao.com/o/s6j7Wwzi` (실제 링크, 활성) |
| 요금표 | `f04bb96` — 7일 462,000 / 30일 1,650,000원(12시간 기준), 30일이 시급 최저가 |
| 관리자 페이지 `/admin` | `ed0ab52` — 운영현황 실시간 조정, 비번+쿠키 로그인, 저장 `.data/status.json` |
| 베트남 캠퍼스 + 디스코드 중계 | `8aebd86` — 글로벌→베트남, 신뢰요소 추가 |
| 히어로 로고 순환 + 슬라이드쇼 | `4d7da73` — 로고 3종 순환, 배경 16장 |
| 계약서 문구 전면 제거 | `3bf3485` (2026-06-15) — 신뢰요소/절차/후기/FAQ/메타에서 삭제 |
| 히어로 높이 25% 축소 | `7be0775` (2026-06-15) |
| 요금 안내 문구 | `3b38e28` (2026-06-15) — `pricingInquiry` 골드 콜아웃 |
| 모바일 상단 고정 가로 메뉴 | `5e39841` (2026-06-15) — `Header.tsx` md:hidden 행 + scroll-padding |
| 히어로 골드 배지 강조 | `e03b04c` (2026-06-15) |

## 기술 스택 / API

- Next.js 16.2.7 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS 4 (`@theme inline`, `globals.css`)
- 폰트: Noto Sans KR (`next/font/google`)
- **외부 API/DB 없음.** 결제/폼/로그인 없음. 유일한 외부 동선 = 카톡 오픈채팅 링크.
- `/admin` 한정으로 서버액션 + 파일 저장(`.data/status.json`) 사용 → 완전 정적은 아님(부분 동적).

## 미해결 / placeholder

1. `googleSiteVerification` = `""` — Google Search Console 미등록. 등록 후 인증 코드 입력 필요.
2. (선택) 메이플스토리는 요금 섹션에만 있음 — 히어로 취급종목 배지(`supportedTitles`)·FAQ엔 없음.
3. StatusBoard 수치 정기 갱신 루틴 부재 — 방치 시 "실시간 현황판" 신뢰 역효과. `/admin`에서 갱신.
4. 빌드 시 Turbopack 경고 1건(`next.config.ts` NFT 트레이스, `status.ts`→`admin/page.tsx` 경유) — 빌드는 정상 통과, 기능 영향 없음.

## 다음 작업 순서

1. Google Search Console 등록 → `googleSiteVerification` 입력 → sitemap 제출
2. (선택) 메이플스토리를 `supportedTitles`/FAQ에도 추가할지 결정
3. (운영) `/admin`에서 캠퍼스 PC·잔여석 정기 갱신
4. (장기) 가이드형 콘텐츠 페이지 — 린서포트 SEO 전략 (클래스별 육성 가이드 등)

## 작업 시 주의

- 콘텐츠 수정은 무조건 `src/data/site.ts` — 컴포넌트 하드코딩 금지.
- AGENTS.md 경고: Next.js 16은 학습 데이터와 다를 수 있음 — `node_modules/next/dist/docs/` 먼저 확인.
- OG 이미지(`opengraph-image.tsx`)는 한글 렌더링 불가(ImageResponse 기본 폰트) — 영문 유지.
- 커밋 전 `npm run build`(이 디렉토리에서) 통과 확인.
- 배포 후 라이브 검증까지(`curl` 200 + 필요시 grep으로 문구 확인).
- PowerShell에서 사용자에게 ssh 명령 줄 때 **짧게 끊어서** — 긴 한 줄은 붙여넣기 시 줄바꿈(`>>`)으로 잘림.

## 사용자 결정 사항

- 사이트 스타일: 린클고등학교 방식(다크 + 실시간 현황판 + 신뢰 요소)
- 브랜드명: 데스 사관학교 / 연락 수단: 카카오톡 오픈채팅만
- 디자인 톤: zinc-950 배경 + red-500/600 포인트 + 카카오 옐로(#FEE500) CTA + 골드(#c9a227) 액센트

## 참고 경쟁 업체

- 린클고등학교: https://xn--299a9h35r28euq8a4eg.com/ — 구조/디자인 참고 원본
- 로렌팀: https://www.xn--9i1b5dx0m0qcda032ltwli6m.com/ — 해시태그 패턴 차용
- 린서포트: https://xn--9i1b5d86sca296r.com/ — 가이드형 콘텐츠 SEO 전략(향후 참고)
