import { AudioLines, Clapperboard, ImageIcon, type LucideIcon } from "lucide-react";
import type { MaterialType } from "./types";

// Тип материала показывается моно-подписью и иконкой, без цветных плашек.
type MaterialTypeMeta = {
  label: string;
  plural: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const MATERIAL_TYPES: Record<MaterialType, MaterialTypeMeta> = {
  image: {
    label: "Изображение",
    plural: "Изображения",
    href: "/images",
    description: "Фотографии, иллюстрации и схемы",
    icon: ImageIcon,
  },
  video: {
    label: "Видео",
    plural: "Видео",
    href: "/videos",
    description: "Ролики, записи и видеоуроки",
    icon: Clapperboard,
  },
  audio: {
    label: "Аудио",
    plural: "Аудио",
    href: "/audio",
    description: "Музыка, подкасты и звуки",
    icon: AudioLines,
  },
};

export const MATERIAL_TYPE_LIST: MaterialType[] = ["image", "video", "audio"];

export function isMaterialType(value: unknown): value is MaterialType {
  return value === "image" || value === "video" || value === "audio";
}
