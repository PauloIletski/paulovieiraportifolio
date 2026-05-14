"use client";

import { useState } from "react";
import { ComponentFormShell, TextInput } from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function WelcomeHeroContentForm({
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
    String(editingItem?.metadata.group || "highlights"),
  );
  const [value, setValue] = useState(() =>
    String(editingItem?.metadata.value || ""),
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "hero",
        "highlight",
        draft,
        {
          group,
          value: value || draft.title,
          label: draft.label,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setGroup("highlights");
    setValue("");
  }

  return (
    <ComponentFormShell
      title="Cadastrar conteudo do hero"
      description="Formulario apartado para destaques, indicadores e passos da primeira dobra."
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
        label="Grupo"
        value={group}
        placeholder="highlights, stats ou steps"
        onChange={setGroup}
      />
      <TextInput
        label="Valor"
        value={value}
        placeholder="6+"
        onChange={setValue}
      />
      <TextInput
        label="Rotulo"
        value={draft.label}
        placeholder="competencias-chave"
        onChange={(label) => setDraft((current) => ({ ...current, label }))}
      />
    </ComponentFormShell>
  );
}
