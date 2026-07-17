import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { DictionaryProvider } from "@/i18n/DictionaryProvider";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";

export const metadata: Metadata = {
  title: "Admin — ATH Portfolio",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  const { locale, dict } = await getAdminDictionary();

  return (
    <DictionaryProvider locale={locale} dict={dict}>
      <AdminShell username={session?.sub ?? "admin"}>{children}</AdminShell>
    </DictionaryProvider>
  );
}
