"use client";

import { useEffect, useState } from "react";

type CountUpProps = {
  value: number;
  /** Через сколько мс начать отсчет (подгоняем под появление блока). */
  delay?: number;
  duration?: number;
  className?: string;
};

// Число досчитывает от нуля до значения. Экранный диктор сразу читает итоговое число.
export default function CountUp({ value, delay = 0, duration = 1100, className }: CountUpProps) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let start: number | null = null;
    const step = (time: number) => {
      start ??= time;
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [value, delay, duration]);

  return (
    <span className={className}>
      <span aria-hidden>{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
