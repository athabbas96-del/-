import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  Users,
  Newspaper,
  Image as ImageIcon,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { AdminPageHeader, AdminCard } from "@/components/admin/fields";
import { listProjects } from "@/lib/repo/projects";
import { listClients } from "@/lib/repo/clients";
import { listServices } from "@/lib/repo/services";
import { listArticles } from "@/lib/repo/articles";
import { listMedia } from "@/lib/repo/media";
import { getAdminDictionary } from "@/i18n/getAdminDictionary";

export default async function AdminDashboardPage() {
  const { dict } = await getAdminDictionary();
  const stats = [
    {
      label: "Projects",
      count: listProjects().length,
      href: "/admin/projects",
      icon: Briefcase,
    },
    {
      label: "Services",
      count: listServices().length,
      href: "/admin/services",
      icon: Sparkles,
    },
    {
      label: "Clients",
      count: listClients().length,
      href: "/admin/clients",
      icon: Users,
    },
    {
      label: "Articles",
      count: listArticles().length,
      href: "/admin/articles",
      icon: Newspaper,
    },
    {
      label: "Media files",
      count: listMedia().length,
      href: "/admin/media",
      icon: ImageIcon,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={dict.admin.dashboardTitle}
        description={dict.admin.dashboardDescription}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <AdminCard className="hover:border-accent transition-colors">
              <Icon icon={stat.icon} size="md" className="text-accent" />
              <p className="text-foreground mt-4 text-2xl font-medium">
                {stat.count}
              </p>
              <p className="text-muted text-sm">{stat.label}</p>
            </AdminCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
