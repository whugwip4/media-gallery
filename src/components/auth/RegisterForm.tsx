"use client";

import { useState } from "react";
import Notice from "@/components/ui/Notice";
import { button, hint, input, label } from "@/lib/styles";

type Message = { tone: "info" | "error"; text: string };

// Первая неделя: форма проверяет поля в браузере.
// Сохранение пользователя в MySQL добавим на этапе подключения базы данных.
export default function RegisterForm() {
  const [message, setMessage] = useState<Message | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirm")) {
      setMessage({ tone: "error", text: "Пароли не совпадают." });
      return;
    }

    setMessage({
      tone: "info",
      text: "Поля заполнены верно. Сохранение пользователя в базу данных подключим на следующем этапе.",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={label}>
          Имя
        </label>
        <input id="name" name="name" required maxLength={100} autoComplete="name" className={input} />
      </div>
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
          minLength={6}
          autoComplete="new-password"
          aria-describedby="password-hint"
          className={input}
        />
        <p id="password-hint" className={hint}>
          Не короче 6 символов.
        </p>
      </div>
      <div>
        <label htmlFor="confirm" className={label}>
          Повторите пароль
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className={input}
        />
      </div>

      {message && <Notice tone={message.tone}>{message.text}</Notice>}

      <button type="submit" className={`${button("primary", "lg")} w-full`}>
        Зарегистрироваться
      </button>
    </form>
  );
}
