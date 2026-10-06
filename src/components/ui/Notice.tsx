import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";

type Tone = "info" | "success" | "error";

const TONES: Record<Tone, { border: string; icon: LucideIcon; iconColor: string }> = {
  info: { border: "border-ink", icon: Info, iconColor: "text-ink" },
  success: { border: "border-ink", icon: CircleCheck, iconColor: "text-ink" },
  error: { border: "border-accent", icon: CircleAlert, iconColor: "text-accent" },
};

// Сообщение для пользователя. Ошибки объявляются экранным дикторам через role="alert".
export default function Notice({ tone = "info", children }: { tone?: Tone; children: React.ReactNode }) {
  const { border, icon: Icon, iconColor } = TONES[tone];
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-3 border-l-2 bg-surface px-4 py-3 text-sm text-ink ${border}`}
    >
      <Icon className={`mt-0.5 size-4 shrink-0 ${iconColor}`} strokeWidth={1.8} aria-hidden />
      <div>{children}</div>
    </div>
  );
}
