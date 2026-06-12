// 데스 사관학교 문장(crest) — 교차한 검 + 방패 + 해골.
// 색은 currentColor를 따르므로 text-gold 등으로 제어한다. (서버 컴포넌트)
export default function Crest({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 교차한 검 (방패 뒤) */}
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      >
        <line x1="15" y1="19" x2="65" y2="69" />
        <line x1="65" y1="19" x2="15" y2="69" />
        {/* 검 손잡이 가드 */}
        <line x1="10" y1="20" x2="20" y2="14" />
        <line x1="60" y1="14" x2="70" y2="20" />
      </g>

      {/* 방패 */}
      <path
        d="M40 7 L66 15 V37 C66 53 54 64 40 70 C26 64 14 53 14 37 V15 Z"
        fill="rgba(9,9,11,0.9)"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* 해골 */}
      <g fill="currentColor">
        <path
          d="M40 23 C30.6 23 24 29.5 24 38.5 C24 43.5 26 47 29.5 49.2 L29.5 53 C29.5 54.1 30.4 55 31.5 55 L48.5 55 C49.6 55 50.5 54.1 50.5 53 L50.5 49.2 C54 47 56 43.5 56 38.5 C56 29.5 49.4 23 40 23 Z"
          fillOpacity="0.14"
        />
        <circle cx="33.6" cy="39" r="3.4" />
        <circle cx="46.4" cy="39" r="3.4" />
        <path d="M40 43 l-2.2 5.2 h4.4 z" />
        {/* 이빨 */}
        <rect x="33" y="54.5" width="2" height="4.2" rx="0.6" />
        <rect x="38.3" y="54.5" width="2" height="4.2" rx="0.6" />
        <rect x="43.6" y="54.5" width="2" height="4.2" rx="0.6" />
      </g>
    </svg>
  );
}
