"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { supabaseBrowser } from "@/app/services/supabaseBrowser";
import type {
  ApiResponse,
  PortfolioItem,
  PortfolioItemCategory,
  PortfolioItemPayload,
  PortfolioItemStatus,
} from "@/app/types/adminPortfolioTypes";

const categories: Array<{ label: string; value: PortfolioItemCategory }> = [
  { label: "Competência", value: "skill" },
  { label: "Projeto", value: "project" },
  { label: "Experiência", value: "experience" },
  { label: "Formação", value: "education" },
  { label: "Certificação", value: "certification" },
];

const statuses: Array<{ label: string; value: PortfolioItemStatus }> = [
  { label: "Rascunho", value: "draft" },
  { label: "Publicado", value: "published" },
];

const initialForm: PortfolioItemPayload = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  category: "project",
  tags: [],
  status: "draft",
  imageUrl: "",
  imagePublicId: "",
  externalUrl: "",
  sortOrder: 0,
  featured: false,
};

type CloudinarySignature = {
  apiKey: string;
  cloudName: string;
  folder: string;
  signature: string;
  timestamp: number;
};

async function parseJson<T>(res: Response) {
  return (await res.json()) as ApiResponse<T>;
}

export function AdminPortfolioPanel() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [tagText, setTagText] = useState("");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const getAccessToken = useCallback(async () => {
    try {
      const { data } = await supabaseBrowser().auth.getSession();
      return data.session?.access_token || null;
    } catch {
      return null;
    }
  }, []);

  const loadItems = useCallback(async (accessToken?: string) => {
    const token = accessToken || (await getAccessToken());

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsLoadingItems(true);
    setError("");
    setStatusMessage("");

    try {
      const res = await fetch("/api/admin/portfolio-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await parseJson<PortfolioItem[]>(res);

      if (!data.ok || !data.data) {
        setError(data.error || "Não foi possível carregar os registros.");
        return;
      }

      setItems(data.data);
      setStatusMessage(`${data.data.length} registro(s) carregado(s).`);
    } catch {
      setError("Falha de conexão ao carregar registros.");
    } finally {
      setIsLoadingItems(false);
    }
  }, [getAccessToken, router]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  async function uploadImage(file: File) {
    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsUploading(true);
    setError("");
    setStatusMessage("");

    try {
      const signatureRes = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ folder: "paulo-portfolio" }),
      });
      const signatureData =
        await parseJson<CloudinarySignature>(signatureRes);

      if (!signatureData.ok || !signatureData.data) {
        setError(signatureData.error || "Não foi possível assinar o upload.");
        return;
      }

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("api_key", signatureData.data.apiKey);
      uploadData.append("timestamp", String(signatureData.data.timestamp));
      uploadData.append("signature", signatureData.data.signature);
      uploadData.append("folder", signatureData.data.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.data.cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        },
      );
      const cloudinaryData = (await uploadRes.json()) as {
        secure_url?: string;
        public_id?: string;
        error?: { message?: string };
      };

      if (!uploadRes.ok || !cloudinaryData.secure_url) {
        setError(
          cloudinaryData.error?.message || "Upload no Cloudinary falhou.",
        );
        return;
      }

      setForm((current) => ({
        ...current,
        imageUrl: cloudinaryData.secure_url,
        imagePublicId: cloudinaryData.public_id || "",
      }));
      setStatusMessage("Imagem enviada para o Cloudinary.");
    } catch {
      setError("Falha de conexão durante o upload.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsSaving(true);
    setError("");
    setStatusMessage("");

    try {
      const payload: PortfolioItemPayload = {
        ...form,
        tags: tagText
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        sortOrder: Number(form.sortOrder || 0),
      };
      const res = await fetch("/api/admin/portfolio-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await parseJson<PortfolioItem>(res);

      if (!data.ok || !data.data) {
        setError(data.error || "Não foi possível salvar o registro.");
        return;
      }

      setItems((current) => [data.data!, ...current]);
      setForm(initialForm);
      setTagText("");
      setStatusMessage("Registro salvo no Supabase.");
    } catch {
      setError("Falha de conexão ao salvar registro.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
        <div id="registros" className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Painel administrativo
            </p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">
              Registros do portfólio
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
              Cadastre competências, projetos, experiências e imagens do currículo
              em uma estrutura pronta para Supabase e Cloudinary.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadItems()}
            disabled={isLoadingItems}
            className="rounded bg-zinc-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingItems ? "Carregando..." : "Carregar registros"}
          </button>
        </div>

        {error ? (
          <p className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </p>
        ) : null}
        {statusMessage ? (
          <p className="mb-6 rounded border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            {statusMessage}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <form
            id="novo-registro"
            onSubmit={handleSubmit}
            className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5">
              <h2 className="text-xl font-black">Novo registro</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Os dados salvos aqui alimentam uma futura camada dinâmica do
                portfólio.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-zinc-700">Título</span>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      title: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">Slug</span>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      slug: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="gerado pelo título se vazio"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">
                  Categoria
                </span>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      category: e.target.value as PortfolioItemCategory,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-zinc-700">Resumo</span>
                <input
                  value={form.summary}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      summary: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-zinc-700">
                  Descrição
                </span>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      description: e.target.value,
                    }))
                  }
                  className="mt-2 min-h-36 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">
                  Tags
                </span>
                <input
                  value={tagText}
                  onChange={(e) => setTagText(e.target.value)}
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Next.js, VTEX, Supabase"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">Status</span>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      status: e.target.value as PortfolioItemStatus,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">
                  URL externa
                </span>
                <input
                  type="url"
                  value={form.externalUrl}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      externalUrl: e.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-zinc-700">Ordem</span>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      sortOrder: Number(e.target.value),
                    }))
                  }
                  className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="flex items-center gap-3 rounded border border-zinc-200 px-3 py-3">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      featured: e.target.checked,
                    }))
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm font-bold text-zinc-700">
                  Destacar no portfólio
                </span>
              </label>
            </div>

            <div className="mt-5 rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-4">
              <label className="block">
                <span className="text-sm font-bold text-zinc-700">
                  Upload de imagem
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadImage(file);
                  }}
                  className="mt-2 block w-full text-sm text-zinc-700 file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
                />
              </label>
              {isUploading ? (
                <p className="mt-3 text-sm font-semibold text-blue-700">
                  Enviando imagem...
                </p>
              ) : null}
              {form.imageUrl ? (
                <div className="mt-4">
                  <img
                    src={form.imageUrl}
                    alt="Prévia do registro"
                    className="h-44 w-full rounded object-cover"
                  />
                  <p className="mt-2 break-all text-xs text-zinc-500">
                    {form.imagePublicId}
                  </p>
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-5 w-full rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Salvando..." : "Salvar no Supabase"}
            </button>
          </form>

          <aside id="biblioteca" className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">Registros</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Últimos itens cadastrados.
                </p>
              </div>
              <span className="rounded bg-zinc-100 px-3 py-1 text-sm font-bold text-zinc-700">
                {items.length}
              </span>
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <p className="rounded border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                  Carregue ou salve registros para visualizar a lista.
                </p>
              ) : (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded border border-zinc-200 p-4"
                  >
                    <div className="flex gap-3">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-16 w-16 rounded object-cover"
                        />
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-black text-zinc-950">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                          {item.category} · {item.status}
                        </p>
                        {item.summary ? (
                          <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                            {item.summary}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </aside>
        </div>

    </>
  );
}
