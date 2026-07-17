import {
  Camera,
  MessageCircle,
  Mail,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { socialLinks } from "@/config/site";

const iconMap: Record<string, LucideIcon> = {
  Camera,
  MessageCircle,
  Mail,
  Briefcase,
};

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={className}>
      {socialLinks.map((link) => {
        const IconComponent = iconMap[link.icon] ?? Mail;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={
              link.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <Icon icon={IconComponent} size="sm" />
          </a>
        );
      })}
    </div>
  );
}
