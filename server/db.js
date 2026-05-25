import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

export function getDbPath() {
  return process.env.DATABASE_PATH || path.join(rootDir, 'data', 'mza.db')
}

export function initDb() {
  const dbPath = getDbPath()
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })

  const db = new Database(dbPath)
  db.pragma('journal_mode = WAL')

  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'layout',
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      related_service_id TEXT,
      includes TEXT NOT NULL,
      ideal_for TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS company_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      address TEXT NOT NULL,
      hours TEXT,
      social TEXT NOT NULL DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      read INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );
  `)

  seedIfEmpty(db, rootDir)
  ensureAdminUser(db)

  return db
}

function seedIfEmpty(db, rootDir) {
  const count = db.prepare('SELECT COUNT(*) as c FROM services').get().c
  if (count > 0) return

  const contentDir = path.join(rootDir, 'public', 'content')

  const servicesJson = JSON.parse(
    fs.readFileSync(path.join(contentDir, 'services.json'), 'utf-8'),
  )
  const plansJson = JSON.parse(
    fs.readFileSync(path.join(contentDir, 'plans.json'), 'utf-8'),
  )
  const company = JSON.parse(
    fs.readFileSync(path.join(contentDir, 'company.json'), 'utf-8'),
  )
  const contact = JSON.parse(
    fs.readFileSync(path.join(contentDir, 'contact.json'), 'utf-8'),
  )

  const insertService = db.prepare(`
    INSERT INTO services (id, name, description, icon, featured, sort_order)
    VALUES (@id, @name, @description, @icon, @featured, @sort_order)
  `)

  servicesJson.services.forEach((s, i) => {
    insertService.run({
      id: s.id,
      name: s.name,
      description: s.description,
      icon: s.icon,
      featured: s.featured ? 1 : 0,
      sort_order: i,
    })
  })

  const insertPlan = db.prepare(`
    INSERT INTO plans (id, name, tagline, related_service_id, includes, ideal_for, sort_order)
    VALUES (@id, @name, @tagline, @related_service_id, @includes, @ideal_for, @sort_order)
  `)

  plansJson.plans.forEach((p, i) => {
    insertPlan.run({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      related_service_id: p.relatedServiceId ?? null,
      includes: JSON.stringify(p.includes),
      ideal_for: p.idealFor,
      sort_order: i,
    })
  })

  db.prepare(`
    INSERT INTO company_settings (id, name, tagline, description)
    VALUES (1, @name, @tagline, @description)
  `).run(company)

  db.prepare(`
    INSERT INTO contact_settings (id, email, phone, address, hours, social)
    VALUES (1, @email, @phone, @address, @hours, @social)
  `).run({
    email: contact.email,
    phone: contact.phone,
    address: contact.address,
    hours: contact.hours ?? null,
    social: JSON.stringify(contact.social ?? {}),
  })

  console.log('Database seeded from public/content/*.json')
}

function ensureAdminUser(db) {
  const count = db.prepare('SELECT COUNT(*) as c FROM admin_users').get().c
  if (count > 0) return

  const username = process.env.ADMIN_USERNAME || 'admin'
  const password = process.env.ADMIN_PASSWORD || 'admin1234567891011'
  const hash = bcrypt.hashSync(password, 10)

  db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(
    username,
    hash,
  )
  console.log(`Default admin created: username="${username}" (change ADMIN_PASSWORD in .env)`)
}

export function rowToService(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    icon: row.icon,
    featured: Boolean(row.featured),
  }
}

export function rowToPlan(row) {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    relatedServiceId: row.related_service_id ?? undefined,
    includes: JSON.parse(row.includes),
    idealFor: row.ideal_for,
  }
}

export function getPublicContent(db) {
  const services = db
    .prepare('SELECT * FROM services ORDER BY sort_order ASC')
    .all()
    .map(rowToService)

  const plans = db
    .prepare('SELECT * FROM plans ORDER BY sort_order ASC')
    .all()
    .map(rowToPlan)

  const company = db.prepare('SELECT * FROM company_settings WHERE id = 1').get()
  const contact = db.prepare('SELECT * FROM contact_settings WHERE id = 1').get()

  return {
    services,
    plans,
    company: company
      ? {
          name: company.name,
          tagline: company.tagline,
          description: company.description,
        }
      : null,
    contact: contact
      ? {
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          hours: contact.hours ?? undefined,
          social: JSON.parse(contact.social),
        }
      : null,
  }
}
