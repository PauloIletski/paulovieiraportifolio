type ContentMetadataFieldProps = {
  metadataText: string;
  metadataHelp?: string;
  onChangeMetadataText: (value: string) => void;
};

export function ContentMetadataField({
  metadataText,
  metadataHelp,
  onChangeMetadataText,
}: ContentMetadataFieldProps) {
  return (
    <label className="mt-4 block">
      <span className="text-sm font-bold text-zinc-700">Metadata JSON</span>
      {metadataHelp ? (
        <span className="mt-1 block text-xs leading-5 text-zinc-500">
          {metadataHelp}
        </span>
      ) : null}
      <textarea
        value={metadataText}
        onChange={(e) => onChangeMetadataText(e.target.value)}
        spellCheck={false}
        className="mt-2 min-h-48 w-full rounded border border-zinc-300 bg-zinc-950 px-3 py-3 font-mono text-xs text-zinc-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
