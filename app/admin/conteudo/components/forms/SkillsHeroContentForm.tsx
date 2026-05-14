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

export function SkillsHeroContentForm({
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
  const [stacks, setStacks] = useState(() => {
    const stackList = Array.isArray(editingItem?.metadata.stacks)
      ? editingItem.metadata.stacks
      : [];
    return stackList
      .map((stack) => {
        if (!stack || typeof stack !== "object") return "";
        const item = stack as { name?: unknown; icon?: unknown };
        return `${String(item.name || "")}|${String(item.icon || "")}`;
      })
      .filter(Boolean)
      .join("\n");
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "skills",
        "skill_group",
        draft,
        {
          stacks: stacks
            .split("\n")
            .map((line) => {
              const [name, icon] = line.split("|").map((item) => item.trim());
              return { name, icon };
            })
            .filter((stack) => stack.name),
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setStacks("");
  }

  return (
    <ComponentFormShell
      title="Cadastrar grupo de habilidades"
      description="Formulario apartado para grupos do SkillsHero e suas stacks."
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
        label="Resumo do grupo"
        value={draft.summary}
        onChange={(summary) => setDraft((current) => ({ ...current, summary }))}
      />
      <TextAreaInput
        label="Stacks"
        value={stacks}
        onChange={setStacks}
      />
    </ComponentFormShell>
  );
}
