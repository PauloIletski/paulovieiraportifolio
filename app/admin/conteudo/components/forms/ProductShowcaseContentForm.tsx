"use client";

import { useState } from "react";
import { ComponentFormShell, TextInput } from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function ProductShowcaseContentForm({
  isSaving,
  isUploading,
  editingItem,
  onSave,
  onUploadImage,
  onCancelEdit,
}: ComponentContentFormProps) {
  const [draft, setDraft] = useState(() =>
    editingItem ? draftFromItem(editingItem) : createBaseDraft(),
  );
  const [techs, setTechs] = useState(() =>
    String(editingItem?.metadata.techs || editingItem?.summary || ""),
  );
  const [filter, setFilter] = useState(() =>
    String(editingItem?.metadata.filter || "Front-end"),
  );
  const [available, setAvailable] = useState(() =>
    editingItem ? Boolean(editingItem.metadata.available) : true,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "showcase",
        "competency",
        draft,
        {
          cartId: String(editingItem?.metadata.cartId || draft.title),
          techs,
          filter,
          available,
          icon: draft.icon,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setTechs("");
    setFilter("Front-end");
    setAvailable(true);
  }

  return (
    <ComponentFormShell
      title="Cadastrar competencia"
      description="Formulario apartado para os cards selecionaveis do ProductShowcase."
      draft={draft}
      isSaving={isSaving}
      isUploading={isUploading}
      isEditing={Boolean(editingItem)}
      onSubmit={handleSubmit}
      onChangeDraft={setDraft}
      onUploadFile={async (file) => {
        const image = await onUploadImage(file);
        if (image) setDraft((current) => ({ ...current, ...image }));
      }}
      onCancelEdit={onCancelEdit}
    >
      <TextInput
        label="Tecnologias"
        value={techs}
        required
        placeholder="React · Next.js · TypeScript"
        onChange={setTechs}
      />
      <TextInput
        label="Filtro"
        value={filter}
        placeholder="Front-end"
        onChange={setFilter}
      />
      <TextInput
        label="Icone"
        value={draft.icon}
        placeholder="frontend"
        onChange={(icon) => setDraft((current) => ({ ...current, icon }))}
      />
      <label className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-3">
        <input
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm font-bold text-zinc-700">Disponivel</span>
      </label>
    </ComponentFormShell>
  );
}
