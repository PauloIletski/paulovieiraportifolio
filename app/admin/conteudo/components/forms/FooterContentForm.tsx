"use client";

import { useState } from "react";
import { ComponentFormShell, TextInput } from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function FooterContentForm({
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
  const [group, setGroup] = useState(() =>
    String(editingItem?.metadata.group || "curriculo"),
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "footer",
        "footer_link",
        draft,
        {
          group,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setGroup("curriculo");
  }

  return (
    <ComponentFormShell
      title="Cadastrar item do rodape"
      description="Formulario apartado para links e grupos do Footer."
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
        placeholder="#projects"
        onChange={(href) => setDraft((current) => ({ ...current, href }))}
      />
      <TextInput label="Grupo" value={group} onChange={setGroup} />
    </ComponentFormShell>
  );
}
