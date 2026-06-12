// mark1~3.jpg(체크무늬 배경 로고)를 투명 WebP(720px)로 변환해 public/marks/01~03.webp 로 저장.
// 밝은 무채색(체크무늬) 픽셀을 투명 처리 후 트림·리사이즈. 일회성 도구.
import sharp from "sharp";
import { join } from "node:path";
import { mkdirSync, rmSync } from "node:fs";

const SRC = "C:/Users/User/Desktop/lineageimg";
const OUT = join(process.cwd(), "public", "marks");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const files = ["mark1.jpg", "mark2.jpg", "mark3.jpg"];

let n = 0;
for (const f of files) {
  n += 1;
  const img = sharp(join(SRC, f)).ensureAlpha();
  const { width, height } = await img.metadata();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const sat = Math.max(r, g, b) - Math.min(r, g, b);
    // 밝고(min>=165) 무채색(채도<=28)인 픽셀 = 체크무늬/흰배경 -> 투명
    if (Math.min(r, g, b) >= 165 && sat <= 28) data[i + 3] = 0;
  }

  const out = join(OUT, `${String(n).padStart(2, "0")}.webp`);
  const meta = await sharp(data, { raw: { width, height, channels: ch } })
    .trim()
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  console.log(`${f} -> marks/${String(n).padStart(2, "0")}.webp  ${meta.width}x${meta.height} (${Math.round(meta.size / 1024)} KB)`);
}
