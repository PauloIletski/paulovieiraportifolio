"use client";

import { useState } from "react";
import {
  ComponentFormShell,
  TextAreaInput,
  TextInput,
} from "./ComponentFormShell";
import {
  buildSectionPayload,
  createBaseDraft,
  draftFromItem,
  type ComponentContentFormProps,
} from "./componentFormTypes";

export function ProjectsContentForm({
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
  const [badge, setBadge] = useState(() =>
    String(editingItem?.metadata.badge || ""),
  );
  const [stacks, setStacks] = useState(() =>
    Array.isArray(editingItem?.metadata.stacks)
      ? editingItem.metadata.stacks.map(String).join(", ")
      : "",
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "projects",
        "project_card",
        draft,
        {
          badge,
          stacks: stacks
            .split(",")
            .map((stack) => stack.trim())
            .filter(Boolean),
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setBadge("");
    setStacks("");
  }

  return (
    <ComponentFormShell
      title="Cadastrar projeto"
      description="Formulario apartado para cases com imagem, link, badge e tecnologias."
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
        label="Link do projeto"
        value={draft.href}
        required
        placeholder="https://..."
        onChange={(href) => setDraft((current) => ({ ...current, href }))}
      />
      <TextInput label="Badge" value={badge} onChange={setBadge} />
      <TextInput
        label="Stacks"
        value={stacks}
        placeholder="Next.js, Cloudinary, Vercel"
        className="block md:col-span-2"
        onChange={setStacks}
      />
      <TextAreaInput
        label="Descricao do projeto"
        value={draft.description}
        onChange={(description) =>
          setDraft((current) => ({ ...current, description }))
        }
      />
    </ComponentFormShell>
  );
}
