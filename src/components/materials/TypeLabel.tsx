import { MATERIAL_TYPES } from "@/lib/material-types";
import type { MaterialType } from "@/lib/types";

// Тип материала моно-подписью прописными, при необходимости с иконкой.
export default function TypeLabel({ type, withIcon = false }: { type: MaterialType; withIcon?: boolean }) {
  const meta = MATERIAL_TYPES[type];
  const Icon = meta.icon;
  return (
    <span className="inline-flex items-center gap-2 font-mono text-meta uppercase text-muted">
      {withIcon && <Icon className="size-4" strokeWidth={1.8} aria-hidden />}
      {meta.label}
    </span>
  );
}
