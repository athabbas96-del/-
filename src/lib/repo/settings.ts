import "server-only";
import { db } from "@/lib/db";
import {
  settingsFromRow,
  type SiteSettingsRecord,
  type SiteSettingsRow,
} from "@/lib/repo/types";

export function getSettings(): SiteSettingsRecord {
  const row = db
    .prepare("SELECT * FROM site_settings WHERE id = 1")
    .get() as SiteSettingsRow;
  return settingsFromRow(row);
}

export function updateSettings(input: SiteSettingsRecord): SiteSettingsRecord {
  db.prepare(
    `
    UPDATE site_settings SET
      heroName = @heroName, heroRolesJson = @heroRolesJson,
      heroBadge = @heroBadge, aboutEyebrow = @aboutEyebrow,
      aboutHeading = @aboutHeading, aboutStoryJson = @aboutStoryJson,
      visionLabel = @visionLabel, visionText = @visionText,
      missionLabel = @missionLabel, missionText = @missionText,
      contactIntro = @contactIntro, cvMediaUrl = @cvMediaUrl,
      portfolioMediaUrl = @portfolioMediaUrl, updatedAt = @updatedAt
    WHERE id = 1
  `,
  ).run({
    heroName: input.heroName,
    heroRolesJson: JSON.stringify(input.heroRoles),
    heroBadge: input.heroBadge,
    aboutEyebrow: input.aboutEyebrow,
    aboutHeading: input.aboutHeading,
    aboutStoryJson: JSON.stringify(input.aboutStory),
    visionLabel: input.visionLabel,
    visionText: input.visionText,
    missionLabel: input.missionLabel,
    missionText: input.missionText,
    contactIntro: input.contactIntro,
    cvMediaUrl: input.cvMediaUrl,
    portfolioMediaUrl: input.portfolioMediaUrl,
    updatedAt: new Date().toISOString(),
  });

  return getSettings();
}
