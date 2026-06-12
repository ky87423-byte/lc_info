// mark1.jpg(리니지클래식 로고, 회색 체크무늬 배경)를 투명 PNG로 변환해 public/mark.png 로 저장.
// 밝은 무채색(체크무늬/흰색) 픽셀을 투명 처리한다. 일회성 도구.
import sharp from "sharp";
import { join } from "node:path";

const SRC = "C:/Users/User/Desktop/lineageimg/mark1.jpg";
const OUT = join(process.cwd(), "public", "mark.png");

const img = sharp(SRC).ensureAlpha();
const { width, height } = await img.metadata();
const { data, info } = await img
  .raw()
  .toBuffer({ resolveWithObject: true });

const ch = info.channels; // 4
for (let i = 0; i < data.length; i += ch) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min; // 무채색이면 작음
  // 밝고(>= 165) 무채색(채도 <= 28)인 픽셀 = 체크무늬/흰배경 -> 투명
  if (min >= 165 && sat <= 28) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width, height, channels: ch } })
  .png()
  .trim() // 투명 여백 잘라내기
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`완료: public/mark.png  ${meta.width}x${meta.height}`);
