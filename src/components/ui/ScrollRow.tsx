"use client";

import { useEffect, useRef } from "react";

type ScrollRowProps = {
  /** Меняется при выборе другого пункта, чтобы ряд снова прокрутился к нему. */
  activeKey: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

// Горизонтальный ряд фильтров: на телефоне сам прокручивается так,
// чтобы выбранный пункт (aria-current) оказался по центру и был виден.
export default function ScrollRow({ activeKey, className = "", ariaLabel, children }: ScrollRowProps) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const row = ref.current;
    const active = row?.querySelector<HTMLElement>("[aria-current]");
    if (!row || !active || row.scrollWidth <= row.clientWidth) return;

    const rowRect = row.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    row.scrollLeft += activeRect.left - rowRect.left - (rowRect.width - activeRect.width) / 2;
  }, [activeKey]);

  return (
    <ul ref={ref} aria-label={ariaLabel} className={className}>
      {children}
    </ul>
  );
}
