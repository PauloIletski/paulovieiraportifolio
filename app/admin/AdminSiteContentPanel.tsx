"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SiteContentList } from "./conteudo/components/SiteContentList";
import { SiteContentSectionGrid } from "./conteudo/components/SiteContentSectionGrid";
import { SiteContentFormBySection } from "./conteudo/components/forms/SiteContentFormBySection";
import {
  getSectionLabel,
  metadataTemplates,
  siteSections,
} from "./conteudo/components/siteContentConfig";
import { supabaseBrowser } from "@/app/services/supabaseBrowser";
import type { ApiResponse } from "@/app/types/adminPortfolioTypes";
import type {
  SiteContentItem,
  SiteContentItemPayload,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";
import type { UploadedImage } from "./conteudo/components/forms/componentFormTypes";

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

const sectionEndpoints: Record<SiteContentSection, string> = {
  menu: "/api/admin/site-content/menu",
  hero: "/api/admin/site-content/hero",
  showcase: "/api/admin/site-content/showcase",
  skills: "/api/admin/site-content/skills",
  projects: "/api/admin/site-content/projects",
  experiences: "/api/admin/site-content/experiences",
  network: "/api/admin/site-content/network",
  floatingButtons: "/api/admin/site-content/floating-buttons",
  footer: "/api/admin/site-content/footer",
};

export function AdminSiteContentPanel() {
  const router = useRouter();
  const [items, setItems] = useState<SiteContentItem[]>([]);
  const [activeSection, setActiveSection] =
    useState<SiteContentSection>("showcase");
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingItem, setEditingItem] = useState<SiteContentItem | null>(null);

  const visibleItems = items.filter((item) => item.section === activeSection);
  const activeSectionInfo =
    siteSections.find((section) => section.value === activeSection) ||
    siteSections[0];

  const getAccessToken = useCallback(async () => {
    try {
      const { data } = await supabaseBrowser().auth.getSession();
      return data.session?.access_token || null;
    } catch {
      return null;
    }
  }, []);

  const loadItems = useCallback(async () => {
    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsLoading(true);
    setError("");
    setStatusMessage("");

    try {
      const res = await fetch(sectionEndpoints[activeSection], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await parseJson<SiteContentItem[]>(res);

      if (!data.ok || !data.data) {
        setError(data.error || "Nao foi possivel carregar os conteudos.");
        return;
      }

      setItems(data.data);
      setStatusMessage(`${data.data.length} conteudo(s) carregado(s).`);
    } catch {
      setError("Falha de conexao ao carregar conteudos.");
    } finally {
      setIsLoading(false);
    }
  }, [activeSection, getAccessToken, router]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  function applyTemplate(section: SiteContentSection) {
    setActiveSection(section);
    setEditingItem(null);
  }

  async function uploadImage(file: File): Promise<UploadedImage | null> {
    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return null;
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
        body: JSON.stringify({ folder: "paulo-portfolio/site-content" }),
      });
      const signatureData = await parseJson<CloudinarySignature>(signatureRes);

      if (!signatureData.ok || !signatureData.data) {
        setError(signatureData.error || "Nao foi possivel assinar o upload.");
        return null;
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
        return null;
      }

      const image = {
        imageUrl: cloudinaryData.secure_url,
        imagePublicId: cloudinaryData.public_id || "",
      };
      setStatusMessage("Imagem enviada para o Cloudinary.");
      return image;
    } catch {
      setError("Falha de conexao durante o upload.");
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function saveSectionPayload(payload: SiteContentItemPayload) {
    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsSaving(true);
    setError("");
    setStatusMessage("");

    try {
      const normalizedPayload: SiteContentItemPayload = {
        ...payload,
        contentType: metadataTemplates[payload.section].contentType,
        sortOrder: Number(payload.sortOrder || 0),
      };
      const isUpdate = Boolean(normalizedPayload.id);
      const res = await fetch(sectionEndpoints[payload.section], {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(normalizedPayload),
      });
      const data = await parseJson<SiteContentItem>(res);

      if (!data.ok || !data.data) {
        setError(data.error || "Nao foi possivel salvar o conteudo.");
        return;
      }

      setItems((current) =>
        isUpdate
          ? current.map((item) => (item.id === data.data!.id ? data.data! : item))
          : [data.data!, ...current],
      );
      setEditingItem(null);
      setStatusMessage(
        isUpdate ? "Conteudo atualizado no Supabase." : "Conteudo salvo no Supabase.",
      );
    } catch {
      setError("Falha de conexao ao salvar conteudo.");
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteSectionItem(item: SiteContentItem) {
    const confirmed = window.confirm(`Excluir "${item.title}"?`);
    if (!confirmed) return;

    const token = await getAccessToken();

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setIsDeleting(true);
    setError("");
    setStatusMessage("");

    try {
      const res = await fetch(
        `${sectionEndpoints[item.section]}?id=${encodeURIComponent(item.id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await parseJson(res);

      if (!data.ok) {
        setError(data.error || "Nao foi possivel excluir o conteudo.");
        return;
      }

      setItems((current) => current.filter((currentItem) => currentItem.id !== item.id));
      if (editingItem?.id === item.id) setEditingItem(null);
      setStatusMessage("Conteudo excluido do Supabase.");
    } catch {
      setError("Falha de conexao ao excluir conteudo.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section
      id="conteudo-site"
      className="space-y-6"
    >
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Conteudo por componente
            </p>
            <h1 className="mt-2 text-3xl font-black text-zinc-950 md:text-5xl">
              Cadastros do site
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
              Cada componente da home possui formulario e API proprios. Selecione
              um componente para gerenciar apenas os campos daquele bloco.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadItems()}
            disabled={isLoading}
            className="rounded bg-zinc-950 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Carregando..." : "Recarregar componente"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="rounded border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}
      {statusMessage ? (
        <p className="rounded border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          {statusMessage}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-lg border border-zinc-200 bg-zinc-50 p-4 shadow-sm lg:sticky lg:top-6">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              Componentes
            </p>
            <h2 className="mt-1 text-lg font-black text-zinc-950">
              Formularios apartados
            </h2>
          </div>
          <SiteContentSectionGrid
            activeSection={activeSection}
            items={items}
            onSelectSection={applyTemplate}
          />
        </aside>

        <div>
          <div className="mb-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Componente ativo
                </p>
                <h2 className="mt-2 text-2xl font-black text-zinc-950">
                  {getSectionLabel(activeSection)}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
                  {activeSectionInfo.description}
                </p>
              </div>
              <div className="rounded border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-600">
                API: {sectionEndpoints[activeSection]}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.7fr)]">
            <SiteContentFormBySection
              key={`${activeSection}-${editingItem?.id || "create"}`}
              activeSection={activeSection}
              isSaving={isSaving}
              isUploading={isUploading}
              editingItem={editingItem}
              onSave={saveSectionPayload}
              onUploadImage={uploadImage}
              onCancelEdit={() => setEditingItem(null)}
            />

            <SiteContentList
              activeSection={activeSection}
              items={visibleItems}
              onEdit={setEditingItem}
              onDelete={(item) => void deleteSectionItem(item)}
              isDeleting={isDeleting}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
