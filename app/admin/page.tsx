import type { Metadata } from "next";
import { AdminShell } from "./AdminShell";
import { AdminPortfolioPanel } from "./AdminPortfolioPanel";

export const metadata: Metadata = {
  title: "Admin | Paulo Vieira",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <AdminShell>
      <AdminPortfolioPanel />
    </AdminShell>
  );
}
