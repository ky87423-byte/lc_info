// 리니지클래식/추가 배경 원본을 웹용 WebP(1600px)로 압축해 public/hero/ 에 저장.
// 일회성 빌드 도구. 실행: node scripts/optimize-hero.mjs
import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SRC = "C:/Users/User/Desktop/lineageimg";
const OUT = join(process.cwd(), "public", "hero");
mkdirSync(OUT, { recursive: true });

// 1) 001_..012_ 형태의 리니지클래식 에피소드 배경 (번호순)
const episodes = readdirSync(SRC)
  .filter((f) => /^\d{3}_.*\.(png|jpg|jpeg)$/i.test(f))
  .sort();

// 2) 추가된 배경 (로고/세로 이미지는 제외하고 가로 배경만 수동 지정)
const extra = [
  "103539_307215_2554.jpg",
  "414697_218068_1716.jpg",
  "5uvv1771486127876.jpg",
  "thumb-1920-1408713.jpg",
];

const files = [...episodes, ...extra.filter((f) => existsSync(join(SRC, f)))];

let i = 0;
for (const f of files) {
  i += 1;
  const out = join(OUT, `${String(i).padStart(2, "0")}.webp`);
  const info = await sharp(join(SRC, f))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(out);
  console.log(`${f} -> ${i.toString().padStart(2, "0")}.webp  (${Math.round(info.size / 1024)} KB)`);
}
console.log(`\n완료: ${i}장`);
