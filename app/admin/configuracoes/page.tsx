import type { Metadata } from "next";
import { AdminShell } from "../AdminShell";
import { AdminSettingsPanel } from "./AdminSettingsPanel";

export const metadata: Metadata = {
  title: "Configuracoes | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <AdminSettingsPanel />
    </AdminShell>
  );
}
