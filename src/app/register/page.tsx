import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = { title: "Регистрация" };

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Регистрация"
      description="Создайте аккаунт, чтобы добавлять свои материалы в галерею."
      footer={
        <>
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-ink underline underline-offset-4 hover:no-underline">
            Войти
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
