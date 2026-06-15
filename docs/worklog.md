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

## 2026-06-05 — 문서 정비 (세션 2)

### 1. MEMORY.md 상세 구조화 (`7d9cc89`)

- 사용자 요청으로 7개 항목 체계로 재작성:
  목적 / 완료된 기능 / 사용 중인 API / DB 상태 / 배포 상태 / 해결 안 된 문제 / 다음 작업 순서
- 완료 기능을 커밋 해시 포함 테이블로 정리
- 새로 명시한 사실:
  - 외부 API·DB 없음 (완전 정적, 유일한 외부 동선 = 카톡 링크)
  - StatusBoard "실시간" 현황은 실제로는 `site.ts` 정적 수치 + 수동 갱신
  - 리스크 2건 추가: OG 이미지 한글 불가(폰트 fetch로 개선 가능), 현황판 갱신 루틴 부재 시 신뢰 요소 역효과
- 커밋 + push 완료 (`6bbd4d9..7d9cc89`)

### 미완료 / 다음 세션 할 일

- 세션 1의 미완료 목록과 동일 (코드 변경 없음, 문서만 정비)
- 1~3번(배포/카톡 링크/Search Console)은 사용자 입력 필요

## 2026-06-06 ~ 06-14 — 배포·운영 기능 (로그 미작성 구간)

> 이 구간은 worklog에 따로 기록 안 됐음. git log 기준 요약 (상세는 각 커밋 참조):

- 배포: **Shinjiru VPS(`111.90.148.135`) + 도메인 `gameboostforge.com`** 로 실제 배포 (Vercel 아님).
  next start(3000) + PM2 + Nginx + Certbot(HTTPS). 같은 VPS에 lc_vn(gmhm365.com)도 co-host.
- `ed0ab52` 관리자 페이지 `/admin` — 운영현황(캠퍼스 PC·잔여석) 실시간 조정. 비번+쿠키 로그인, 저장은 `.data/status.json`. → **사이트가 부분 동적으로 바뀜**(StatusBoard가 저장소 읽음, 저장 시 revalidatePath).
- `4d7da73` 히어로 로고 3종 순환 + 배경 슬라이드쇼 16장
- `8aebd86` 글로벌 캠퍼스 → 베트남 캠퍼스 + 디스코드 실시간 중계 신뢰요소
- `1de34a3` 카카오톡 오픈채팅 실제 링크 적용 (CTA 활성화, `https://open.kakao.com/o/s6j7Wwzi`)
- `f04bb96` 요금표 추가 (7일 462,000원 / 30일 1,650,000원, 12시간 기준) + 메뉴/메인 노출

## 2026-06-15 — 콘텐츠 수정 + 배포 인프라 정비 (세션)

### 1. 계약서 문구 전체 제거 (`3bf3485`)

- 사용자 요청 "홈페이지 계약서 문구 빼버려".
- `site.ts`: trustItems "계약서 작성" 항목 삭제, processSteps "계약서 작성" 단계 삭제, 후기 1건·FAQ 2건 리워딩.
- `layout.tsx`: meta description에서 "계약서 작성" 제거.
- 라이브 검증: 서빙 HTML에 "계약서" 0회 확인.

### 2. SSH 무비밀번호 배포 키 구축 (인프라, 커밋 없음)

- 기존 `id_ed25519`(코멘트 mikrotik-key)는 **passphrase가 걸려** 자동배포 불가였음.
- 전용 키 **`C:\Users\User\.ssh\lc_info_deploy`(passphrase 없음)** 새로 생성 → pub키를 서버 `/root/.ssh/authorized_keys`에 등록.
- 트러블슈팅: PowerShell에서 긴 한 줄 붙여넣기가 줄바꿈(`>>`)되며 명령이 잘리는 문제로 여러 번 실패 → 짧은 명령으로 해결.
- **접속 시 주의**: 기본 `ssh`는 passphrase 걸린 id_ed25519를 먼저 시도해 막힘 → 반드시 `-i ...lc_info_deploy -o IdentitiesOnly=yes` 지정.

### 3. PM2 다운 복구 + 자동시작 등록 (인프라)

- 배포 중 발견: **PM2 데몬이 죽어 lc_info·lc_vn 둘 다 다운** 상태였음 (포트 3000/3001 리스너 없음).
- 원인: `pm2 startup`(systemd) 미설정 → 재부팅 시 자동복구 안 됨.
- 조치: 둘 다 재기동 → `pm2 save` → `pm2 startup systemd -u root --hp /root`로 `pm2-root.service` enabled. 이제 재부팅 살아남음.

### 4. 히어로 슬라이드쇼 높이 25% 축소 (`7be0775`)

- `Hero.tsx` 콘텐츠 패딩 `py-24 sm:py-32` → `py-18 sm:py-24` (정확히 25%↓). 높이는 고정값 없이 패딩으로 결정됨.

### 5. 요금 섹션 안내 문구 추가 (`3b38e28`)

- `site.ts`에 `pricingInquiry` 추가, `Pricing.tsx` 헤더 아래 골드 콜아웃 박스로 렌더.
- 문구: "리니지클래식 · 아이온2 · SOL 인챈트 · 메이플스토리 등 온라인게임 육성 문의 환영".
- 메이플스토리는 **요금 섹션에만** 넣음 (히어로 배지·FAQ엔 아직 없음 — 추가 가능).

### 6. 모바일 상단 고정 가로 메뉴 (`5e39841`)

- 기존 nav는 `hidden md:flex`라 모바일에 메뉴 없었음.
- `Header.tsx`에 `md:hidden` 가로 메뉴 행 추가(헤더 안 → 함께 상단 고정): 운영 현황·서비스·요금·이용 절차 앵커.
- `globals.css`에 `scroll-padding-top`(모바일 6.5rem / md 4.5rem) 추가 — 앵커 이동 시 고정 헤더에 안 가리게.

### 7. 히어로 취급종목 골드 배지 강조 (`e03b04c`)

- `Hero.tsx` 배지: 글자 ↑(text-sm/sm:text-base), `font-bold`, 테두리 gold/30→gold/60, 골드 배경 틴트 + 골드 글로우. "상담 가능"도 강조.

### 배포 방법 (다음 세션은 이걸로 바로)

```
ssh -i "$env:USERPROFILE\.ssh\lc_info_deploy" -o IdentitiesOnly=yes -o BatchMode=yes -p 20203 root@111.90.148.135 "cd /var/www/lc_info && git pull && npm run build && pm2 reload lc_info"
```

- 콘텐츠/CSS 변경: 위 한 줄(pull→build→reload)이면 무중단 반영. `npm ci`는 의존성 변경 시에만.
- 검증: `curl -s -o /dev/null -w '%{http_code}' https://gameboostforge.com` → 200.
- PowerShell에서 사용자에게 명령 줄 때는 **짧게 끊어서** 줄 것(긴 줄 붙여넣기 줄바꿈 이슈).

### 다음 세션 할 일

- [ ] Google Search Console 등록 + `site.ts`의 `googleSiteVerification` 입력 (아직 `""`) + sitemap 제출
- [ ] (선택) 메이플스토리를 히어로 취급종목 배지·FAQ에도 추가할지 결정
- [ ] (운영) StatusBoard 수치는 `/admin`에서 갱신 — 정기 갱신 루틴
- [ ] 서버 `.env.local`의 `ADMIN_PASSWORD` 설정 상태는 유지되고 있는지 가끔 확인(없으면 기본 changeme 위험)
