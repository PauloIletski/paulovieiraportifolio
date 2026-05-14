import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Login Admin | Paulo Vieira",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
          <p className="text-sm font-semibold text-zinc-600">
            Carregando login...
          </p>
        </main>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
