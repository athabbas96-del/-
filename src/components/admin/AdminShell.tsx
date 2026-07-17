"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  Users,
  Newspaper,
  Image as ImageIcon,
  Type,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { Icon } from "@/components/ui/Icon";
import { useI18n } from "@/i18n/DictionaryProvider";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", labelKey: "dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", labelKey: "projects", icon: Briefcase },
  { href: "/admin/services", labelKey: "services", icon: Sparkles },
  { href: "/admin/clients", labelKey: "clients", icon: Users },
  { href: "/admin/articles", labelKey: "articles", icon: Newspaper },
  { href: "/admin/media", labelKey: "media", icon: ImageIcon },
  { href: "/admin/texts", labelKey: "texts", icon: Type },
] as const;

function AdminLocaleToggle() {
  const { locale } = useI18n();
  const router = useRouter();

  function setLocale(next: Locale) {
    // eslint-disable-next-line react-hooks/immutability -- document.cookie is a native DOM API, not React state
    document.cookie = `ADMIN_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((entry) => (
        <button
          key={entry}
          type="button"
          onClick={() => setLocale(entry)}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[11px] uppercase transition-colors",
            entry === locale
              ? "bg-accent text-white"
              : "text-muted hover:text-foreground",
          )}
        >
          {entry}
        </button>
      ))}
    </div>
  );
}

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { dict } = useI18n();

  return (
    <div className="bg-background flex min-h-svh w-full">
      <aside className="border-border bg-surface hidden w-64 shrink-0 flex-col border-e p-5 md:flex">
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="text-foreground font-mono text-sm tracking-[0.1em] uppercase"
          >
            ATH Admin
          </Link>
          <AdminLocaleToggle />
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              "exact" in item && item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--radius-xs)] px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-background hover:text-foreground",
                )}
              >
                <Icon icon={item.icon} size="sm" />
                {dict.admin.nav[item.labelKey]}
              </Link>
            );
          })}
        </nav>

        <div className="border-border mt-auto flex flex-col gap-3 border-t pt-5">
          <Link
            href="/"
            target="_blank"
            className="text-muted hover:text-foreground flex items-center gap-2 text-xs"
          >
            <Icon icon={ExternalLink} size="sm" />
            {dict.admin.viewLiveSite}
          </Link>
          <div className="text-muted flex items-center justify-between text-xs">
            <span className="truncate">
              {dict.admin.signedInAs} {username}
            </span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-muted hover:text-foreground flex items-center gap-2 text-xs"
            >
              <Icon icon={LogOut} size="sm" />
              {dict.admin.signOut}
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-border bg-surface flex flex-col gap-3 border-b px-5 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <span className="text-foreground font-mono text-sm tracking-[0.1em] uppercase">
              ATH Admin
            </span>
            <div className="flex items-center gap-3">
              <AdminLocaleToggle />
              <form action={logoutAction}>
                <button type="submit" className="text-muted text-xs">
                  {dict.admin.signOut}
                </button>
              </form>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const isActive =
                "exact" in item && item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-accent text-white"
                      : "bg-background text-muted",
                  )}
                >
                  {dict.admin.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
