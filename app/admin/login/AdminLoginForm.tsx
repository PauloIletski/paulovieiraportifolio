"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/services/supabaseBrowser";

type LoginMode = "login" | "reset";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<LoginMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const configError = searchParams.get("error");
    if (configError) setError(configError);

    async function checkSession() {
      try {
        const supabase = supabaseBrowser();
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          router.replace("/admin");
          return;
        }
      } catch {
        setError("Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      }

      setIsCheckingSession(false);
    }

    void checkSession();
  }, [router, searchParams]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setStatusMessage("");

    try {
      const supabase = supabaseBrowser();
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Não foi possível conectar ao Supabase Auth.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setStatusMessage("");

    try {
      const supabase = supabaseBrowser();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        },
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setStatusMessage(
        "Enviamos um link para redefinir sua senha, se o e-mail existir no Supabase.",
      );
    } catch {
      setError("Não foi possível enviar o e-mail de recuperação.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isCheckingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <p className="text-sm font-semibold text-zinc-600">
          Verificando sessão...
        </p>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 text-zinc-950">
      <form
        onSubmit={mode === "login" ? handleLogin : handleResetPassword}
        className="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Acesso administrativo
        </p>
        <h1 className="mt-2 text-3xl font-black">
          {mode === "login" ? "Entrar no painel" : "Recuperar senha"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {mode === "login"
            ? "Use o e-mail e senha cadastrados no Supabase Auth."
            : "Informe seu e-mail para receber o link de redefinição de senha."}
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-bold text-zinc-700">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            autoComplete="email"
            required
          />
        </label>

        {mode === "login" ? (
          <label className="mt-4 block">
            <span className="text-sm font-bold text-zinc-700">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              autoComplete="current-password"
              required
            />
          </label>
        ) : null}

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
          disabled={isLoading}
          className="mt-5 w-full rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading
            ? "Aguarde..."
            : mode === "login"
              ? "Entrar"
              : "Enviar link de recuperação"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "reset" : "login");
            setError("");
            setStatusMessage("");
          }}
          className="mt-4 w-full text-sm font-bold text-blue-700 transition hover:text-blue-900"
        >
          {mode === "login" ? "Esqueci minha senha" : "Voltar para login"}
        </button>
      </form>
    </main>
  );
}
