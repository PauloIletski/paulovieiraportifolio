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

export function ExperiencesContentForm({
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
  const [role, setRole] = useState(() =>
    String(editingItem?.metadata.role || ""),
  );
  const [duration, setDuration] = useState(() =>
    String(editingItem?.metadata.duration || ""),
  );
  const [companyLink, setCompanyLink] = useState(() =>
    String(editingItem?.metadata.companyLink || editingItem?.href || ""),
  );
  const [points, setPoints] = useState(() =>
    Array.isArray(editingItem?.metadata.points)
      ? editingItem.metadata.points.map(String).join("\n")
      : "",
  );
  const [whiteLogo, setWhiteLogo] = useState(() =>
    Boolean(editingItem?.metadata.whiteLogo),
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await onSave(
      buildSectionPayload(
        "experiences",
        "experience_card",
        { ...draft, href: companyLink },
        {
          role,
          duration,
          companyLink,
          points: points
            .split("\n")
            .map((point) => point.trim())
            .filter(Boolean),
          whiteLogo,
        },
        editingItem?.id,
      ),
    );
    setDraft(createBaseDraft());
    setRole("");
    setDuration("");
    setCompanyLink("");
    setPoints("");
    setWhiteLogo(false);
  }

  return (
    <ComponentFormShell
      title="Cadastrar experiencia"
      description="Formulario apartado para empresas, cargos, periodo, logo e entregas profissionais."
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
      <TextInput label="Cargo" value={role} required onChange={setRole} />
      <TextInput label="Periodo" value={duration} onChange={setDuration} />
      <TextInput
        label="Link da empresa"
        value={companyLink}
        placeholder="https://empresa.com"
        onChange={setCompanyLink}
      />
      <TextInput
        label="Logo externa"
        value={draft.imageUrl}
        placeholder="https://..."
        onChange={(imageUrl) =>
          setDraft((current) => ({ ...current, imageUrl }))
        }
      />
      <TextAreaInput
        label="Principais entregas"
        value={points}
        onChange={setPoints}
      />
      <label className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-3">
        <input
          type="checkbox"
          checked={whiteLogo}
          onChange={(e) => setWhiteLogo(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm font-bold text-zinc-700">
          Logo precisa de fundo escuro
        </span>
      </label>
    </ComponentFormShell>
  );
}
