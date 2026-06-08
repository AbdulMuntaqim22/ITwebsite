import { Router } from 'express'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { COOKIE_NAME, signToken } from '../middleware/auth.js'

export function createAuthRouter(db) {
  const router = Router()

  router.post('/login', (req, res) => {
    const { username, password } = req.body ?? {}
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' })
    }

    const user = db
      .prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ?')
      .get(username)

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const token = signToken({ sub: user.id, username: user.username })
    const isProd = process.env.NODE_ENV === 'production'

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ ok: true, username: user.username, token })
  })

  router.post('/logout', (_req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.json({ ok: true })
  })

  router.get('/me', (req, res) => {
    const token =
      req.cookies?.[COOKIE_NAME] ??
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.slice(7)
        : null)

    if (!token) return res.status(401).json({ error: 'Not logged in' })

    try {
      const secret = process.env.SESSION_SECRET || 'dev-secret-change-me'
      const payload = jwt.verify(token, secret)
      res.json({ username: payload.username })
    } catch {
      res.status(401).json({ error: 'Not logged in' })
    }
  })

  return router
}
