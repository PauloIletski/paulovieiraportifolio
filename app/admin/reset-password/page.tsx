import type { Metadata } from "next";
import { AdminResetPasswordForm } from "./AdminResetPasswordForm";

export const metadata: Metadata = {
  title: "Redefinir senha | Paulo Vieira",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminResetPasswordPage() {
  return <AdminResetPasswordForm />;
}
