"use client";

import { useState } from "react";
import Notice from "@/components/ui/Notice";
import { button, input, label } from "@/lib/styles";

// Первая неделя: только интерфейс входа.
// Проверку логина и пароля по базе данных добавим на следующем этапе.
export default function LoginForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={input} />
      </div>
      <div>
        <label htmlFor="password" className={label}>
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={input}
        />
      </div>

      {sent && <Notice>Проверку логина и пароля подключим вместе с базой данных.</Notice>}

      <button type="submit" className={`${button("primary", "lg")} w-full`}>
        Войти
      </button>
    </form>
  );
}
