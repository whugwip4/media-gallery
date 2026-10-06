import { LogoMark } from "@/components/layout/Logo";
import { container } from "@/lib/styles";

const BENEFITS = [
  "Добавляйте свои фото, видео и аудио",
  "Все ваши материалы — в личном кабинете",
  "Категории и поиск по названию",
];

type AuthLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

// Страницы входа и регистрации: слева форма, справа спокойный блок со знаком логотипа
// (на телефоне блок скрыт, чтобы форма была сразу под рукой).
export default function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className={`${container} pt-10 sm:pt-16`}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-md">
          <h1 className="text-heading max-sm:text-[2rem]">{title}</h1>
          <p className="mt-3 text-muted">{description}</p>
          <div className="mt-10">{children}</div>
          <p className="mt-8 border-t border-line pt-6 text-muted">{footer}</p>
        </div>

        <aside className="hidden bg-surface p-10 lg:block">
          <div aria-hidden>
            <LogoMark variant="symbol" height={96} />
          </div>
          <p className="mt-10 text-subheading">Галерея, в которую приятно добавлять своё</p>
          <ul className="mt-6 border-b border-line">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="border-t border-line py-3 text-ink-2">
                {benefit}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
