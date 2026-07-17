import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import {
  serviceFromRow,
  type ServiceRecord,
  type ServiceRow,
} from "@/lib/repo/types";

export interface ServiceInput {
  icon: string;
  title: string;
  description: string;
}

export function listServices(): ServiceRecord[] {
  const rows = db
    .prepare("SELECT * FROM services ORDER BY sortOrder ASC")
    .all() as ServiceRow[];
  return rows.map(serviceFromRow);
}

export function getServiceById(id: string): ServiceRecord | null {
  const row = db.prepare("SELECT * FROM services WHERE id = ?").get(id) as
    ServiceRow | undefined;
  return row ? serviceFromRow(row) : null;
}

export function createService(input: ServiceInput): ServiceRecord {
  const id = randomUUID();
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM services")
    .get() as { count: number };

  db.prepare(
    `INSERT INTO services (id, icon, title, description, sortOrder) VALUES (?, ?, ?, ?, ?)`,
  ).run(id, input.icon, input.title, input.description, count);

  return getServiceById(id)!;
}

export function updateService(id: string, input: ServiceInput): ServiceRecord {
  db.prepare(
    `UPDATE services SET icon = ?, title = ?, description = ? WHERE id = ?`,
  ).run(input.icon, input.title, input.description, id);
  return getServiceById(id)!;
}

export function deleteService(id: string): void {
  db.prepare("DELETE FROM services WHERE id = ?").run(id);
}
