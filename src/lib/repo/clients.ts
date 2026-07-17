import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import {
  clientFromRow,
  type ClientRecord,
  type ClientRow,
} from "@/lib/repo/types";

export interface ClientInput {
  name: string;
  logo: string;
  slug?: string;
}

export function listClients(): ClientRecord[] {
  const rows = db
    .prepare("SELECT * FROM clients ORDER BY sortOrder ASC, createdAt ASC")
    .all() as ClientRow[];
  return rows.map(clientFromRow);
}

export function getClientById(id: string): ClientRecord | null {
  const row = db.prepare("SELECT * FROM clients WHERE id = ?").get(id) as
    ClientRow | undefined;
  return row ? clientFromRow(row) : null;
}

export function createClient(input: ClientInput): ClientRecord {
  const id = randomUUID();
  const now = new Date().toISOString();
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM clients")
    .get() as { count: number };

  db.prepare(
    `INSERT INTO clients (id, name, logo, slug, sortOrder, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(id, input.name, input.logo, input.slug ?? null, count, now);

  return getClientById(id)!;
}

export function updateClient(id: string, input: ClientInput): ClientRecord {
  db.prepare(
    `UPDATE clients SET name = ?, logo = ?, slug = ? WHERE id = ?`,
  ).run(input.name, input.logo, input.slug ?? null, id);
  return getClientById(id)!;
}

export function deleteClient(id: string): void {
  db.prepare("DELETE FROM clients WHERE id = ?").run(id);
}
