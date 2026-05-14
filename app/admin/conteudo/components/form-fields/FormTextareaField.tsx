type FormTextareaFieldProps = {
  label: string;
  value?: string;
  className?: string;
  onChange: (value: string) => void;
};

export function FormTextareaField({
  label,
  value,
  className = "block",
  onChange,
}: FormTextareaFieldProps) {
  return (
    <label className={className}>
      <span className="text-sm font-bold text-zinc-700">{label}</span>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-28 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
