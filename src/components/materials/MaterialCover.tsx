import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { Material } from "@/lib/types";

type MaterialCoverProps = {
  material: Material;
  sizes: string;
  /** Для картинок в первом экране: грузить сразу, а не лениво. */
  eager?: boolean;
};

// Высоты полос «звуковой волны» у заглушки аудио.
const BARS = [28, 60, 44, 92, 52, 108, 68, 40, 84, 52, 72, 32, 20, 36];

// Обложка материала. У изображения это сама картинка, у видео и аудио — спокойные заглушки:
// видео — рамка с кнопкой воспроизведения, аудио — белая волна на чёрном.
export default function MaterialCover({ material, sizes, eager = false }: MaterialCoverProps) {
  if (material.type === "image" && material.fileUrl) {
    return (
      <Image
        src={material.fileUrl}
        alt={material.title}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        className="object-cover"
      />
    );
  }

  if (material.type === "video") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden>
        <rect width="400" height="300" className="fill-sunken" />
        <rect x="50" y="50" width="300" height="180" strokeWidth="1.5" className="fill-paper stroke-ink" />
        <circle cx="200" cy="140" r="30" className="fill-ink" />
        <path d="M191 125v30l25-15z" className="fill-paper" />
        <rect x="50" y="248" width="300" height="2" fill="#cfcfcb" />
        <rect x="50" y="248" width="110" height="2" className="fill-ink" />
      </svg>
    );
  }

  if (material.type === "audio") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden>
        <rect width="400" height="300" className="fill-ink" />
        <g className="fill-paper">
          {BARS.map((_, index) => {
            const height = BARS[(index + material.id) % BARS.length];
            return <rect key={index} x={122 + index * 12} y={150 - height / 2} width="4" height={height} />;
          })}
        </g>
      </svg>
    );
  }

  return (
    <div className="flex size-full items-center justify-center bg-sunken">
      <ImageIcon className="size-10 text-muted" strokeWidth={1.4} aria-hidden />
    </div>
  );
}
