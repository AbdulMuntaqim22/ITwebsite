import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { rowToPlan, rowToService } from '../db.js'

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function createAdminRouter(db) {
  const router = Router()
  router.use(requireAuth)

  // --- Company ---
  router.get('/company', (_req, res) => {
    const row = db.prepare('SELECT * FROM company_settings WHERE id = 1').get()
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json({
      name: row.name,
      tagline: row.tagline,
      description: row.description,
    })
  })

  router.put('/company', (req, res) => {
    const { name, tagline, description } = req.body ?? {}
    db.prepare(
      `UPDATE company_settings SET name = ?, tagline = ?, description = ? WHERE id = 1`,
    ).run(name, tagline, description)
    res.json({ ok: true })
  })

  // --- Contact settings ---
  router.get('/contact', (_req, res) => {
    const row = db.prepare('SELECT * FROM contact_settings WHERE id = 1').get()
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json({
      email: row.email,
      phone: row.phone,
      address: row.address,
      hours: row.hours ?? undefined,
      social: JSON.parse(row.social),
    })
  })

  router.put('/contact', (req, res) => {
    const { email, phone, address, hours, social } = req.body ?? {}
    db.prepare(
      `UPDATE contact_settings SET email = ?, phone = ?, address = ?, hours = ?, social = ? WHERE id = 1`,
    ).run(email, phone, address, hours ?? null, JSON.stringify(social ?? {}))
    res.json({ ok: true })
  })

  // --- Services ---
  router.get('/services', (_req, res) => {
    const rows = db.prepare('SELECT * FROM services ORDER BY sort_order ASC').all()
    res.json(rows.map(rowToService))
  })

  router.post('/services', (req, res) => {
    const { id, name, description, icon, featured } = req.body ?? {}
    const serviceId = id?.trim() || slugify(name)
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM services').get().m ?? -1

    try {
      db.prepare(
        `INSERT INTO services (id, name, description, icon, featured, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(
        serviceId,
        name,
        description,
        icon || 'layout',
        featured ? 1 : 0,
        maxOrder + 1,
      )
      res.status(201).json({ ok: true, id: serviceId })
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        return res.status(409).json({ error: 'Service ID already exists' })
      }
      throw e
    }
  })

  router.put('/services/:id', (req, res) => {
    const { name, description, icon, featured } = req.body ?? {}
    const result = db
      .prepare(
        `UPDATE services SET name = ?, description = ?, icon = ?, featured = ? WHERE id = ?`,
      )
      .run(name, description, icon, featured ? 1 : 0, req.params.id)

    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  router.delete('/services/:id', (req, res) => {
    const result = db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id)
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  // --- Plans ---
  router.get('/plans', (_req, res) => {
    const rows = db.prepare('SELECT * FROM plans ORDER BY sort_order ASC').all()
    res.json(rows.map(rowToPlan))
  })

  router.post('/plans', (req, res) => {
    const { id, name, tagline, relatedServiceId, includes, idealFor } = req.body ?? {}
    const planId = id?.trim() || slugify(name)
    const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM plans').get().m ?? -1

    try {
      db.prepare(
        `INSERT INTO plans (id, name, tagline, related_service_id, includes, ideal_for, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ).run(
        planId,
        name,
        tagline,
        relatedServiceId ?? null,
        JSON.stringify(includes ?? []),
        idealFor,
        maxOrder + 1,
      )
      res.status(201).json({ ok: true, id: planId })
    } catch (e) {
      if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        return res.status(409).json({ error: 'Plan ID already exists' })
      }
      throw e
    }
  })

  router.put('/plans/:id', (req, res) => {
    const { name, tagline, relatedServiceId, includes, idealFor } = req.body ?? {}
    const result = db
      .prepare(
        `UPDATE plans SET name = ?, tagline = ?, related_service_id = ?, includes = ?, ideal_for = ? WHERE id = ?`,
      )
      .run(
        name,
        tagline,
        relatedServiceId ?? null,
        JSON.stringify(includes ?? []),
        idealFor,
        req.params.id,
      )

    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  router.delete('/plans/:id', (req, res) => {
    const result = db.prepare('DELETE FROM plans WHERE id = ?').run(req.params.id)
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  // --- Submissions ---
  router.get('/submissions', (_req, res) => {
    const rows = db
      .prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
      .all()
    res.json(
      rows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        service: r.service,
        message: r.message,
        createdAt: r.created_at,
        read: Boolean(r.read),
      })),
    )
  })

  router.patch('/submissions/:id', (req, res) => {
    const { read } = req.body ?? {}
    const result = db
      .prepare('UPDATE contact_submissions SET read = ? WHERE id = ?')
      .run(read ? 1 : 0, req.params.id)

    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  router.delete('/submissions/:id', (req, res) => {
    const result = db
      .prepare('DELETE FROM contact_submissions WHERE id = ?')
      .run(req.params.id)

    if (result.changes === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  })

  return router
}
