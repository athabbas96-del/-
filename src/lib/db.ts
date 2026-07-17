import "server-only";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import { seedIfEmpty } from "@/lib/seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "app.db");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS media (
  id         TEXT PRIMARY KEY,
  url        TEXT NOT NULL,
  type       TEXT NOT NULL,
  filename   TEXT NOT NULL,
  size       INTEGER NOT NULL,
  createdAt  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id              TEXT PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  client          TEXT NOT NULL,
  category        TEXT NOT NULL,
  summary         TEXT NOT NULL,
  problem         TEXT NOT NULL,
  goal            TEXT NOT NULL,
  strategy        TEXT NOT NULL,
  execution       TEXT NOT NULL,
  results         TEXT NOT NULL,
  metricsJson     TEXT NOT NULL DEFAULT '[]',
  year            INTEGER NOT NULL,
  toolsJson       TEXT NOT NULL DEFAULT '[]',
  coverImage      TEXT NOT NULL,
  coverAlt        TEXT NOT NULL,
  galleryJson     TEXT NOT NULL DEFAULT '[]',
  videoJson       TEXT,
  beforeAfterJson TEXT,
  testimonialJson TEXT,
  featured        INTEGER NOT NULL DEFAULT 0,
  sortOrder       INTEGER NOT NULL DEFAULT 0,
  createdAt       TEXT NOT NULL,
  updatedAt       TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clients (
  id        TEXT PRIMARY KEY,
  name      TEXT NOT NULL,
  logo      TEXT NOT NULL,
  slug      TEXT,
  sortOrder INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
  id          TEXT PRIMARY KEY,
  icon        TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  sortOrder   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS articles (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  coverImage  TEXT,
  content     TEXT NOT NULL,
  tagsJson    TEXT NOT NULL DEFAULT '[]',
  published   INTEGER NOT NULL DEFAULT 0,
  publishedAt TEXT,
  createdAt   TEXT NOT NULL,
  updatedAt   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  id                INTEGER PRIMARY KEY CHECK (id = 1),
  heroName          TEXT NOT NULL,
  heroRolesJson     TEXT NOT NULL DEFAULT '[]',
  heroBadge         TEXT NOT NULL,
  aboutEyebrow      TEXT NOT NULL,
  aboutHeading      TEXT NOT NULL,
  aboutStoryJson    TEXT NOT NULL DEFAULT '[]',
  visionLabel       TEXT NOT NULL,
  visionText        TEXT NOT NULL,
  missionLabel      TEXT NOT NULL,
  missionText       TEXT NOT NULL,
  contactIntro      TEXT NOT NULL,
  cvMediaUrl        TEXT,
  portfolioMediaUrl TEXT,
  updatedAt         TEXT NOT NULL
);
`;

function createConnection(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const instance = new Database(DB_PATH);
  instance.pragma("journal_mode = WAL");
  instance.exec(SCHEMA);
  return instance;
}

/**
 * Next.js hot-reloads server modules in dev; stash the connection on
 * globalThis so we don't open a new sqlite file handle on every reload.
 */
const globalForDb = globalThis as unknown as { __db?: Database.Database };

export const db = globalForDb.__db ?? createConnection();
if (process.env.NODE_ENV !== "production") globalForDb.__db = db;

seedIfEmpty(db);
