// Строка «подпись — значение» для списков данных (dl): слева моно-подпись, справа значение.
export default function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-t border-line py-4">
      <dt className="font-mono text-meta uppercase text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-right text-ink">{children}</dd>
    </div>
  );
}
