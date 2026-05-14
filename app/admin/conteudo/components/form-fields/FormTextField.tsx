type FormTextFieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "url";
  className?: string;
  onChange: (value: string) => void;
};

export function FormTextField({
  label,
  value,
  placeholder,
  required,
  type = "text",
  className = "block",
  onChange,
}: FormTextFieldProps) {
  return (
    <label className={className}>
      <span className="text-sm font-bold text-zinc-700">{label}</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
