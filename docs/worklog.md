# 작업 일지 (worklog)

## 2026-06-05 — 프로젝트 생성 ~ SEO/보안까지 (세션 1)

### 1. 프로젝트 셋업 (`f8e7775`)

- `create-next-app@16.2.7`로 스캐폴딩 (bam2_info와 동일 구성)
  - TypeScript / Tailwind 4 / ESLint / App Router / `src` 디렉토리 / `@/*` alias / Turbopack
- GitHub 저장소 생성: https://github.com/ky87423-byte/lc_info
  - `gh` CLI 미설치 → 사용자가 웹에서 직접 저장소 생성 후 push
  - 첫 push 시 인증 오류 났으나 저장소 생성 후 정상 push 확인

### 2. 기획 (사용자 결정)

- 리니지클래식 대리육성 사이트. 참고: 우사시육성단(못 찾음), 린클고등학교, 리니지파트너즈
- 경쟁사 분석 (WebFetch):
  - **린클고등학교**: 다크톤, 실시간 PC 현황판(국내/글로벌 캠퍼스), 계약서·사업자등록 강조, 파트너 유튜버 → **이 스타일 채택**
  - **로렌팀**: 심플 원페이지, 카톡 버튼 반복, 해시태그 나열
  - 업계 공통: 가격 비공개 → 카톡 상담 유도
- 브랜드명: **데스 사관학교** / 연락: 카톡 오픈채팅만

### 3. 랜딩 페이지 v1 (`627527d`)

- 9개 섹션: Header(sticky) / Hero / StatusBoard(국내 30PC·글로벌 100PC AM/PM) /
  TrustSection(4개) / Services(육성·부주·파밍·이벤트) / Process(5단계) /
  Reviews(3개) / Faq(5개, 네이티브 `<details>`) / Footer
- 모든 콘텐츠를 `src/data/site.ts`로 분리 (단일 소스)
- 다크 테마: zinc-950 + red 포인트 + 카카오 옐로 CTA / Noto Sans KR
- 전부 서버 컴포넌트 (client 컴포넌트 0개)
- `npm run build` 통과 확인 후 push

### 4. 트러블슈팅

- "localhost:3000 안 됨" → 개발 서버 미실행이 원인. 백그라운드로 `npm run dev` 실행, HTTP 200 확인

### 5. SEO + 보안 (`070aa24`)

- **SEO**:
  - `layout.tsx`: metadataBase, canonical, robots, OG, Twitter, title template
  - `sitemap.ts` / `robots.ts` 추가 (빌드 시 정적 생성 확인)
  - `JsonLd.tsx`: Organization + FAQPage 구조화 데이터 (FAQ 리치 결과 노출용)
  - `opengraph-image.tsx`: OG 공유 이미지 (영문 — ImageResponse 한글 미지원)
  - Hero h1에 핵심 키워드 포함하도록 구조 수정
  - `site.ts`에 `siteUrl`, `googleSiteVerification` placeholder 추가
- **보안** (`next.config.ts`):
  - X-Content-Type-Options / X-Frame-Options / Referrer-Policy / Permissions-Policy / HSTS
  - `poweredByHeader: false`
  - 실제 응답 헤더로 5종 모두 적용 확인

### 6. 키워드 보강 (`652a70d`)

- 사용자 질문("키워드 몇 개? 업체 참고했어?") → 로렌팀 실제 해시태그 9개 수집
- 매트릭스 발견: {리니지클래식|리니지|린클} × {대리|대리육성|부주}
- meta keywords 9 → 18개, 푸터 해시태그 6 → 17개
- 메모: meta keywords는 구글 무시 — 본문 텍스트(푸터 해시태그)가 실질 효과

### 미완료 / 다음 세션 할 일

- [ ] Vercel 배포 (사용자에게 제안한 상태)
- [ ] `kakaoOpenChatUrl` 실제 링크 교체
- [ ] `siteUrl` 실제 도메인 교체 (도메인 미구매)
- [ ] Google Search Console 등록 + sitemap 제출
- [ ] 우사시육성단 URL 받으면 추가 분석
- [ ] (장기) 클래스별 육성 가이드 콘텐츠 페이지 (린서포트 SEO 전략)
