# lc_info 프로젝트 메모리

> 최종 업데이트: 2026-06-05

## 프로젝트 정체성

- **무엇**: 리니지클래식 대리육성 홍보 사이트 (원페이지 랜딩)
- **브랜드**: 데스 사관학교 (DEATH ACADEMY) — 사관학교 컨셉 (입소/캠퍼스/졸업)
- **저장소**: https://github.com/ky87423-byte/lc_info (private 아님 여부 확인 필요)
- **로컬**: `C:\Users\User\lc_info`

## 현재 상태 (2026-06-05 기준)

- ✅ 랜딩 페이지 v1 완성 — 9개 섹션 (Hero/현황판/신뢰/서비스/절차/후기/FAQ/푸터)
- ✅ SEO 적용 — sitemap/robots/JSON-LD(FAQPage 리치결과)/OG이미지/키워드 18개
- ✅ 보안 헤더 5종 적용 확인 완료 (X-Frame-Options, HSTS 등)
- ✅ 빌드 통과, main 브랜치 push 완료 (커밋 4개, 워킹트리 클린)
- ❌ **미배포** — Vercel 배포 예정
- ❌ 카카오톡 오픈채팅 링크 placeholder 상태
- ❌ 도메인 미정 (`siteUrl` = lc-info.example.com placeholder)
- ❌ Google Search Console 미등록

## 사용자 결정 사항

- 사이트 스타일: **린클고등학교 방식** 선택 (다크 + 실시간 현황판 + 신뢰 요소)
- 브랜드명: **데스 사관학교** (사용자가 직접 지정)
- 연락 수단: **카카오톡 오픈채팅만** (전화/텔레그램 안 씀)
- 도메인: 아직 없음 — placeholder로 진행하기로 함

## 참고 경쟁 업체

- 린클고등학교: https://xn--299a9h35r28euq8a4eg.com/ — 구조/디자인 참고 원본
- 로렌팀: https://www.xn--9i1b5dx0m0qcda032ltwli6m.com/ — 해시태그 9개 패턴 차용
- 린서포트: https://xn--9i1b5d86sca296r.com/ — 가이드형 콘텐츠 SEO 전략 (향후 참고)
- 우사시육성단: **검색으로 못 찾음** — 사용자에게 URL 요청한 상태

## 다음 단계 (우선순위순)

1. Vercel 배포 → `site.ts`의 `siteUrl` 실제 주소로 교체
2. 카카오톡 오픈채팅 개설 → `kakaoOpenChatUrl` 교체
3. Google Search Console 등록 → 인증 코드 입력 + sitemap 제출
4. (장기) 가이드형 콘텐츠 페이지 추가 — 린서포트 전략 (클래스별 육성 가이드 등)
5. (장기) 실시간 현황 수치를 실제 운영 데이터로 갱신하는 운영 루틴

## 작업 시 주의

- 콘텐츠 수정은 무조건 `src/data/site.ts` — 컴포넌트 하드코딩 금지
- AGENTS.md 경고: Next.js 16은 학습 데이터와 다를 수 있음 — `node_modules/next/dist/docs/` 먼저 확인
- OG 이미지(`opengraph-image.tsx`)는 한글 렌더링 불가 (ImageResponse 기본 폰트) — 영문 유지
