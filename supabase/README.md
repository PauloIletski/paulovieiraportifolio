# Supabase setup

## Estruturas criadas

- `portfolio_items`: registros curriculares gerais, como competencias, projetos,
  experiencias, formacoes e certificacoes.
- `site_content_items`: conteudos equivalentes aos mocks dos componentes,
  separados por secao do site (`menu`, `hero`, `showcase`, `skills`, `projects`,
  `experiences`, `network`, `floatingButtons` e `footer`). Campos especificos de
  cada mock, como `stacks`, `points`, `badge`, `available` e `whiteLogo`, ficam em
  `metadata` como JSON.
- `admin_audit_logs`: registro de criacoes feitas pelo painel.

Este diretório contém as migrations usadas pelo painel administrativo em `/admin`.

## Variáveis necessárias

Configure no ambiente local e na Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAILS` (lista separada por vírgula)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

`SUPABASE_SERVICE_ROLE_KEY` deve ser a chave `service_role` do Supabase, usada apenas no servidor. Não use essa chave em componentes client-side.

## Aplicando migrations

Com o Supabase CLI configurado:

```bash
supabase link --project-ref <project-ref>
supabase db push
```

Ou copie o conteúdo dos arquivos em `supabase/migrations` e execute no SQL Editor do Supabase, mantendo a ordem dos nomes dos arquivos.

## Autenticação administrativa

O login em `/admin/login` usa Supabase Auth com e-mail e senha. A recuperação
de senha usa `resetPasswordForEmail` e redireciona para `/admin/reset-password`.

As rotas administrativas exigem `Authorization: Bearer <access_token>` e validam
o usuário com `supabase.auth.getUser`. Além disso, o e-mail do usuário precisa
estar listado em `ADMIN_EMAILS`.

No painel do Supabase, cadastre o usuário admin em Authentication > Users e
configure a URL de redirect permitida para:

```text
https://seu-dominio.com/admin/reset-password
http://localhost:3000/admin/reset-password
```
