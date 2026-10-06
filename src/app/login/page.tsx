import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Вход" };

export default function LoginPage() {
  return (
    <AuthLayout
      title="Вход в аккаунт"
      description="Войдите, чтобы добавлять материалы и открыть личный кабинет."
      footer={
        <>
          Нет аккаунта?{" "}
          <Link href="/register" className="font-medium text-ink underline underline-offset-4 hover:no-underline">
            Зарегистрироваться
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
