import jwt from 'jsonwebtoken'

export const COOKIE_NAME = 'mza_admin_token'

export function getTokenFromReq(req) {
  const header = req.headers.authorization
  if (header?.startsWith('Bearer ')) return header.slice(7)
  return req.cookies?.[COOKIE_NAME] ?? null
}

export function requireAuth(req, res, next) {
  const token = getTokenFromReq(req)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const secret = process.env.SESSION_SECRET || 'dev-secret-change-me'
    req.admin = jwt.verify(token, secret)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' })
  }
}

export function signToken(payload) {
  const secret = process.env.SESSION_SECRET || 'dev-secret-change-me'
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}
