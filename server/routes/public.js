import { Router } from 'express'
import { getPublicContent } from '../db.js'

export function createPublicRouter(db) {
  const router = Router()

  router.get('/content', (_req, res) => {
    res.json(getPublicContent(db))
  })

  router.post('/submissions', (req, res) => {
    const { name, email, phone, service, message } = req.body ?? {}

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }

    const result = db
      .prepare(
        `INSERT INTO contact_submissions (name, email, phone, service, message)
         VALUES (?, ?, ?, ?, ?)`,
      )
      .run(
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        service?.trim() || 'General inquiry',
        message.trim(),
      )

    res.status(201).json({ ok: true, id: result.lastInsertRowid })
  })

  return router
}
