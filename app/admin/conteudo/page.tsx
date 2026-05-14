import type { Metadata } from "next";
import { AdminShell } from "../AdminShell";
import { AdminSiteContentPanel } from "../AdminSiteContentPanel";

export const metadata: Metadata = {
  title: "Conteudo do site | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminContentPage() {
  return (
    <AdminShell>
      <AdminSiteContentPanel />
    </AdminShell>
  );
}
