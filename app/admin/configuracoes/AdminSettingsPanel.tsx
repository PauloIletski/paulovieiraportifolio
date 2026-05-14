export function AdminSettingsPanel() {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
        Painel administrativo
      </p>
      <h1 className="mt-2 text-3xl font-black md:text-5xl">Configuracoes</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
        A autenticacao usa a sessao atual do Supabase Auth. Para conceder
        acesso, cadastre o usuario no Supabase e inclua o e-mail em
        `ADMIN_EMAILS`.
      </p>
    </section>
  );
}
