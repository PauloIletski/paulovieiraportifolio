import type { SiteContentItemPayload } from "@/app/types/adminSiteContentTypes";

type ContentImageUploadFieldProps = {
  form: SiteContentItemPayload;
  isUploading: boolean;
  onUploadImage: (file: File) => void;
};

export function ContentImageUploadField({
  form,
  isUploading,
  onUploadImage,
}: ContentImageUploadFieldProps) {
  return (
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
            if (file) onUploadImage(file);
          }}
          className="mt-2 block w-full text-sm text-zinc-700 file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-bold file:text-white"
        />
      </label>
      {isUploading ? (
        <p className="mt-3 text-sm font-semibold text-blue-700">
          Enviando imagem...
        </p>
      ) : null}
      {form.imageUrl ? (
        <div className="mt-4">
          <img
            src={form.imageUrl}
            alt="Previa do conteudo"
            className="h-40 w-full rounded object-cover"
          />
          <p className="mt-2 break-all text-xs text-zinc-500">
            {form.imagePublicId}
          </p>
        </div>
      ) : null}
    </div>
  );
}
