"use client";

import { useState } from "react";
import { ComponentFormShell, TextInput } from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function FloatButtonsContentForm({
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "floatingButtons",
        "social_link",
        draft,
        {
          label: draft.label || "Atalho flutuante",
          floating: true,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
  }

  return (
    <ComponentFormShell
      title="Cadastrar botao flutuante"
      description="Formulario apartado para atalhos fixos de redes e WhatsApp."
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
        label="Link"
        value={draft.href}
        required
        placeholder="https://..."
        onChange={(href) => setDraft((current) => ({ ...current, href }))}
      />
      <TextInput
        label="Icone"
        value={draft.icon}
        placeholder="/assets/whatsapp.png"
        onChange={(icon) => setDraft((current) => ({ ...current, icon }))}
      />
    </ComponentFormShell>
  );
}
