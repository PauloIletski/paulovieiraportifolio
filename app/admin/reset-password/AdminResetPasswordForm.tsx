"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/services/supabaseBrowser";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const supabase = supabaseBrowser();
        const { data } = await supabase.auth.getSession();

        if (!data.session) {
          setError("Link inválido ou expirado. Solicite uma nova recuperação.");
        }
      } catch {
        setError("Configure as variáveis públicas do Supabase.");
      } finally {
        setIsCheckingSession(false);
      }
    }

    void checkSession();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatusMessage("");

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = supabaseBrowser();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setStatusMessage("Senha atualizada. Redirecionando para o painel...");
      setTimeout(() => {
        router.replace("/admin");
        router.refresh();
      }, 1000);
    } catch {
      setError("Não foi possível atualizar a senha.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <p className="text-sm font-semibold text-zinc-600">
          Validando link de recuperação...
        </p>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 text-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Acesso administrativo
        </p>
        <h1 className="mt-2 text-3xl font-black">Redefinir senha</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Crie uma nova senha para sua conta administrativa do Supabase.
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-bold text-zinc-700">Nova senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="new-password"
            required
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-zinc-700">
            Confirmar senha
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="new-password"
            required
          />
        </label>

        {error ? (
          <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
        {statusMessage ? (
          <p className="mt-4 rounded border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">
            {statusMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isLoading || Boolean(error && !password)}
          className="mt-5 w-full rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Atualizando..." : "Atualizar senha"}
        </button>
      </form>
    </main>
  );
}
