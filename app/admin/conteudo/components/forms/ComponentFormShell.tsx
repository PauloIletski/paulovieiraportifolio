import type { ComponentFormDraft } from "./componentFormTypes";

type ComponentFormShellProps = {
  title: string;
  description: string;
  draft: ComponentFormDraft;
  isSaving: boolean;
  isUploading: boolean;
  isEditing?: boolean;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeDraft: (
    updater: (current: ComponentFormDraft) => ComponentFormDraft,
  ) => void;
  onUploadFile: (file: File) => void;
  onCancelEdit?: () => void;
};

export function ComponentFormShell({
  title,
  description,
  draft,
  isSaving,
  isUploading,
  isEditing,
  children,
  onSubmit,
  onChangeDraft,
  onUploadFile,
  onCancelEdit,
}: ComponentFormShellProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded border border-zinc-200 bg-zinc-50 p-4"
    >
      <div className="mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-lg font-black text-zinc-950">
              {isEditing ? title.replace("Cadastrar", "Editar") : title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          </div>
          {isEditing && onCancelEdit ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded border border-zinc-300 bg-white px-3 py-2 text-xs font-black text-zinc-700 transition hover:border-red-300 hover:text-red-700"
            >
              Cancelar edição
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Titulo"
          value={draft.title}
          required
          className="block md:col-span-2"
          onChange={(titleValue) =>
            onChangeDraft((current) => ({ ...current, title: titleValue }))
          }
        />
        {children}
        <TextInput
          label="Tags"
          value={draft.tags}
          placeholder="Next.js, VTEX, Vercel"
          onChange={(tags) =>
            onChangeDraft((current) => ({ ...current, tags }))
          }
        />
        <label className="block">
          <span className="text-sm font-bold text-zinc-700">Status</span>
          <select
            value={draft.status}
            onChange={(e) =>
              onChangeDraft((current) => ({
                ...current,
                status: e.target.value as ComponentFormDraft["status"],
              }))
            }
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-zinc-700">Ordem</span>
          <input
            type="number"
            value={draft.sortOrder}
            onChange={(e) =>
              onChangeDraft((current) => ({
                ...current,
                sortOrder: Number(e.target.value),
              }))
            }
            className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-3">
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) =>
              onChangeDraft((current) => ({
                ...current,
                featured: e.target.checked,
              }))
            }
            className="h-4 w-4"
          />
          <span className="text-sm font-bold text-zinc-700">Destacar</span>
        </label>
      </div>

      <div className="mt-4 rounded border border-dashed border-zinc-300 bg-white p-4">
        <label className="block">
          <span className="text-sm font-bold text-zinc-700">
            Upload de imagem ou logo
          </span>
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUploadFile(file);
            }}
            className="mt-2 block w-full text-sm text-zinc-700 file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
          />
        </label>
        {isUploading ? (
          <p className="mt-3 text-sm font-semibold text-blue-700">
            Enviando imagem...
          </p>
        ) : null}
        {draft.imageUrl ? (
          <div className="mt-4">
            <img
              src={draft.imageUrl}
              alt="Previa do conteudo"
              className="h-40 w-full rounded object-cover"
            />
            <p className="mt-2 break-all text-xs text-zinc-500">
              {draft.imagePublicId}
            </p>
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 w-full rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving
          ? "Salvando..."
          : isEditing
            ? "Atualizar cadastro"
            : "Salvar cadastro"}
      </button>
    </form>
  );
}

export function TextInput({
  label,
  value,
  placeholder,
  required,
  className = "block",
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-bold text-zinc-700">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

export function TextAreaInput({
  label,
  value,
  className = "block md:col-span-2",
  onChange,
}: {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-bold text-zinc-700">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-28 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
