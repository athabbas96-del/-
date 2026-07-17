import { Hero } from "@/components/sections/Hero";
import { getSettings } from "@/lib/repo/settings";

export default function Home() {
  const settings = getSettings();

  return (
    <main className="flex flex-1 flex-col">
      <Hero
        name={settings.heroName}
        roles={settings.heroRoles}
        badge={settings.heroBadge}
      />
    </main>
  );
}
