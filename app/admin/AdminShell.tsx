"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/services/supabaseBrowser";
import type { ApiResponse } from "@/app/types/adminPortfolioTypes";

const adminMenuItems = [
  { label: "Registros", href: "/admin" },
  { label: "Conteudo do site", href: "/admin/conteudo" },
  { label: "Configuracoes", href: "/admin/configuracoes" },
];

async function parseJson<T>(res: Response) {
  return (await res.json()) as ApiResponse<T>;
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const getAccessToken = useCallback(async () => {
    try {
      const { data } = await supabaseBrowser().auth.getSession();
      return data.session?.access_token || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      const token = await getAccessToken();

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      const res = await fetch("/api/admin/session", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await parseJson<{ authenticated: boolean }>(res);

      if (!data.ok || !data.data?.authenticated) {
        await supabaseBrowser().auth.signOut();
        const message = data.error
          ? encodeURIComponent(data.error)
          : "Sessao administrativa invalida";
        router.replace(`/admin/login?error=${message}`);
        return;
      }

      setIsCheckingSession(false);
    }

    void checkSession();
  }, [getAccessToken, router]);

  async function handleLogout() {
    await supabaseBrowser().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  if (isCheckingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
        <p className="text-sm font-semibold text-zinc-600">
          Verificando acesso administrativo...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-zinc-950">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-zinc-200 bg-white px-4 py-4 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded bg-blue-600 text-sm font-black text-white">
              PV
            </span>
            <div>
              <p className="font-black text-zinc-950">Admin</p>
              <p className="text-xs font-semibold text-zinc-500">
                Portifolio curriculo
              </p>
            </div>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {adminMenuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-zinc-200 bg-zinc-50 p-4 lg:block">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Sessao atual
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-700">
              Supabase Auth
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 hidden w-full rounded border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 transition hover:border-red-300 hover:text-red-700 lg:block"
          >
            Sair
          </button>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-8 lg:px-8 lg:py-10">
          <div className="mb-6 flex justify-end lg:hidden">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded border border-zinc-300 bg-white px-5 py-3 text-sm font-black text-zinc-900 transition hover:border-red-300 hover:text-red-700"
            >
              Sair
            </button>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
