import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function CodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function MonitorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  );
}

function BagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function DatabaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function GearIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4" />
      <path d="M12 19v4" />
      <path d="m4.22 4.22 2.83 2.83" />
      <path d="m16.95 16.95 2.83 2.83" />
      <path d="M1 12h4" />
      <path d="M19 12h4" />
      <path d="m4.22 19.78 2.83-2.83" />
      <path d="m16.95 7.05 2.83-2.83" />
    </svg>
  );
}

function ContractIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 2h9l5 5v15H6z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  );
}

const contentIconLibrary = {
  frontend: CodeIcon,
  backend: MonitorIcon,
  ecommerce: BagIcon,
  database: DatabaseIcon,
  devops: GearIcon,
  clticontrato: ContractIcon,
} as const;

export type SiteContentIconName = keyof typeof contentIconLibrary;

export function hasSiteContentIcon(value?: string): value is SiteContentIconName {
  if (!value) return false;

  return value in contentIconLibrary;
}

export function SiteContentIcon({
  name,
  className = "h-6 w-6",
}: {
  name: SiteContentIconName;
  className?: string;
}) {
  const Icon = contentIconLibrary[name];

  return (
    <Icon
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      aria-hidden="true"
    />
  );
}
