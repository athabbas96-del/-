import "server-only";
import type Database from "better-sqlite3";
import { randomUUID } from "node:crypto";
import { projects as staticProjects } from "@/content/projects";
import { clients as staticClients } from "@/content/clients";
import { aboutCopy, expertise as staticServices } from "@/content/about";
import { siteConfig, downloads } from "@/config/site";

/**
 * First-boot only: if the DB was just created (tables empty), populate it
 * with the real content that used to live in src/content/*.ts, so
 * switching the site to be DB-backed doesn't wipe out Atheer's actual
 * projects/clients/copy. No-ops on every subsequent boot.
 */
export function seedIfEmpty(db: Database.Database) {
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM projects")
    .get() as { count: number };
  if (count > 0) return;

  const now = new Date().toISOString();

  const insertProject = db.prepare(`
    INSERT INTO projects (
      id, slug, title, client, category, summary, problem, goal, strategy,
      execution, results, metricsJson, year, toolsJson, coverImage, coverAlt,
      galleryJson, videoJson, beforeAfterJson, testimonialJson, featured,
      sortOrder, createdAt, updatedAt
    ) VALUES (
      @id, @slug, @title, @client, @category, @summary, @problem, @goal,
      @strategy, @execution, @results, @metricsJson, @year, @toolsJson,
      @coverImage, @coverAlt, @galleryJson, @videoJson, @beforeAfterJson,
      @testimonialJson, @featured, @sortOrder, @createdAt, @updatedAt
    )
  `);
  const insertProjects = db.transaction(() => {
    staticProjects.forEach((project, index) => {
      insertProject.run({
        id: randomUUID(),
        slug: project.slug,
        title: project.title,
        client: project.client,
        category: project.category,
        summary: project.summary,
        problem: project.problem,
        goal: project.goal,
        strategy: project.strategy,
        execution: project.execution,
        results: project.results,
        metricsJson: JSON.stringify(project.metrics),
        year: project.year,
        toolsJson: JSON.stringify(project.tools),
        coverImage: project.coverImage,
        coverAlt: project.coverAlt,
        galleryJson: JSON.stringify(project.gallery),
        videoJson: project.video ? JSON.stringify(project.video) : null,
        beforeAfterJson: project.beforeAfter
          ? JSON.stringify(project.beforeAfter)
          : null,
        testimonialJson: project.testimonial
          ? JSON.stringify(project.testimonial)
          : null,
        featured: project.featured ? 1 : 0,
        sortOrder: index,
        createdAt: now,
        updatedAt: now,
      });
    });
  });
  insertProjects();

  const insertClient = db.prepare(`
    INSERT INTO clients (id, name, logo, slug, sortOrder, createdAt)
    VALUES (@id, @name, @logo, @slug, @sortOrder, @createdAt)
  `);
  const insertClients = db.transaction(() => {
    staticClients.forEach((client, index) => {
      insertClient.run({
        id: randomUUID(),
        name: client.name,
        logo: client.logo,
        slug: client.slug ?? null,
        sortOrder: index,
        createdAt: now,
      });
    });
  });
  insertClients();

  const insertService = db.prepare(`
    INSERT INTO services (id, icon, title, description, sortOrder)
    VALUES (@id, @icon, @title, @description, @sortOrder)
  `);
  const insertServices = db.transaction(() => {
    staticServices.forEach((service, index) => {
      insertService.run({
        id: randomUUID(),
        icon: service.icon,
        title: service.title,
        description: service.description,
        sortOrder: index,
      });
    });
  });
  insertServices();

  db.prepare(
    `INSERT INTO media (id, url, type, filename, size, createdAt) VALUES (?, ?, 'pdf', ?, ?, ?)`,
  ).run(randomUUID(), downloads.cv, "Atheer-Abbas-CV.pdf", 75444, now);
  db.prepare(
    `INSERT INTO media (id, url, type, filename, size, createdAt) VALUES (?, ?, 'pdf', ?, ?, ?)`,
  ).run(
    randomUUID(),
    downloads.portfolio,
    "Atheer-Abbas-Portfolio.pdf",
    6564125,
    now,
  );

  db.prepare(
    `
    INSERT INTO site_settings (
      id, heroName, heroRolesJson, heroBadge, aboutEyebrow, aboutHeading,
      aboutStoryJson, visionLabel, visionText, missionLabel, missionText,
      contactIntro, cvMediaUrl, portfolioMediaUrl, updatedAt
    ) VALUES (
      1, @heroName, @heroRolesJson, @heroBadge, @aboutEyebrow, @aboutHeading,
      @aboutStoryJson, @visionLabel, @visionText, @missionLabel, @missionText,
      @contactIntro, @cvMediaUrl, @portfolioMediaUrl, @updatedAt
    )
  `,
  ).run({
    heroName: siteConfig.author.name,
    heroRolesJson: JSON.stringify(siteConfig.roles),
    heroBadge: "Portfolio — 2026",
    aboutEyebrow: aboutCopy.eyebrow,
    aboutHeading: aboutCopy.heading,
    aboutStoryJson: JSON.stringify(aboutCopy.story),
    visionLabel: aboutCopy.vision.label,
    visionText: aboutCopy.vision.text,
    missionLabel: aboutCopy.mission.label,
    missionText: aboutCopy.mission.text,
    contactIntro:
      "Fill out the form or reach out directly — WhatsApp is fastest, email works too. I usually reply within a day or two.",
    cvMediaUrl: downloads.cv,
    portfolioMediaUrl: downloads.portfolio,
    updatedAt: now,
  });
}
