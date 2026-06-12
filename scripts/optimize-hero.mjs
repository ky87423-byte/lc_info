// 리니지클래식 배경 원본(7~20MB PNG)을 웹용 WebP(1600px)로 압축해 public/hero/ 에 저장.
// 일회성 빌드 도구. 실행: node scripts/optimize-hero.mjs
import sharp from "sharp";
import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = "C:/Users/User/Desktop/lineageimg";
const OUT = join(process.cwd(), "public", "hero");
mkdirSync(OUT, { recursive: true });

// 001_..012_ 형태의 에피소드 배경만, 번호순으로
const files = readdirSync(SRC)
  .filter((f) => /^\d{3}_.*\.(png|jpg|jpeg)$/i.test(f))
  .sort();

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
