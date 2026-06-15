// gamebit.co.kr에서 리니지클래식 서버별 아데나 시세(1만 아데나당 원)를 가져온다.
// 공식 API가 없어 인라인 JS의 `'서버명', 가격)` 튜플을 정규식으로 파싱한다.
// 1시간(revalidate) 캐시. 실패 시 마지막으로 확인된 시세(FALLBACK)로 폴백한다.

export type AdenaRate = { server: string; price: number };

// 2026-06-15 gamebit.co.kr 기준 마지막 확인 시세 (스크랩 실패 시 폴백 + 서버명 화이트리스트)
const FALLBACK_RATES: AdenaRate[] = [
  { server: "오렌", price: 2176.47 },
  { server: "데포로쥬", price: 1446.66 },
  { server: "발라카스", price: 1443.49 },
  { server: "질리언", price: 1204.69 },
  { server: "이실로테", price: 1145.15 },
  { server: "오웬", price: 1126.32 },
  { server: "조우", price: 1122.24 },
  { server: "켄라우헬", price: 998.31 },
  { server: "군터", price: 972.46 },
  { server: "하이네", price: 957.57 },
  { server: "크리스터", price: 935.62 },
  { server: "린델", price: 917.16 },
  { server: "하딘", price: 906.3 },
  { server: "케레니스", price: 886.27 },
  { server: "데컨", price: 874.47 },
  { server: "세바스찬", price: 872.01 },
  { server: "가드리아", price: 868.32 },
  { server: "사이하", price: 866.37 },
  { server: "어레인", price: 832.67 },
  { server: "발센", price: 827.4 },
  { server: "파아그리오", price: 821.9 },
  { server: "듀크데필", price: 796.48 },
  { server: "아툰", price: 793.02 },
  { server: "마프르", price: 772.77 },
  { server: "에바", price: 766.45 },
  { server: "캐스톨", price: 741.99 },
  { server: "아인하사드", price: 700.07 },
  { server: "아스테어", price: 674.9 },
  { server: "로엔그린", price: 631.51 },
];

const KNOWN_SERVERS = new Set(FALLBACK_RATES.map((r) => r.server));

export type AdenaResult = { rates: AdenaRate[]; live: boolean };

export async function getAdenaRates(): Promise<AdenaResult> {
  try {
    const res = await fetch("https://gamebit.co.kr", {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; lc-info/1.0)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const html = await res.text();

    const re = /'([가-힣]{2,6})',\s*([0-9]+\.?[0-9]*)\)/g;
    const map = new Map<string, number>();
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const server = m[1];
      const price = parseFloat(m[2]);
      // 알려진 서버명 + 합리적 가격만 채택 (오탐 방지). 첫 등장값 사용.
      if (KNOWN_SERVERS.has(server) && price > 0 && !map.has(server)) {
        map.set(server, price);
      }
    }

    if (map.size < 10) throw new Error(`parsed too few: ${map.size}`);

    // 가격 내림차순 (gamebit 표시 순서와 동일)
    const rates = [...map.entries()]
      .map(([server, price]) => ({ server, price }))
      .sort((a, b) => b.price - a.price);
    return { rates, live: true };
  } catch {
    return { rates: FALLBACK_RATES, live: false };
  }
}
