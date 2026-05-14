"use client";

import { useState } from "react";
import { ComponentFormShell, TextInput } from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function MenuContentForm({
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
  const [desktopOnly, setDesktopOnly] = useState(() =>
    Boolean(editingItem?.metadata.desktopOnly),
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "menu",
        "nav_link",
        draft,
        {
          anchor: draft.href,
          desktopOnly,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setDesktopOnly(false);
  }

  return (
    <ComponentFormShell
      title="Cadastrar item do menu"
      description="Formulario apartado para links do cabecalho e navegacao."
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
        label="Destino"
        value={draft.href}
        required
        placeholder="#projects"
        onChange={(href) => setDraft((current) => ({ ...current, href }))}
      />
      <label className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-3">
        <input
          type="checkbox"
          checked={desktopOnly}
          onChange={(e) => setDesktopOnly(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm font-bold text-zinc-700">
          Exibir apenas no desktop
        </span>
      </label>
    </ComponentFormShell>
  );
}
