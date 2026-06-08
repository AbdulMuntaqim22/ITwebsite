import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDb } from './db.js'
import { createAuthRouter } from './routes/auth.js'
import { createPublicRouter } from './routes/public.js'
import { createAdminRouter } from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')
const PORT = Number(process.env.PORT) || 3001

const db = initDb()
const app = express()

const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

const uploadsDir = path.join(__dirname, 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })
app.use('/uploads', express.static(uploadsDir))

app.use('/api/auth', createAuthRouter(db))
app.use('/api', createPublicRouter(db))
app.use('/api/admin', createAdminRouter(db))

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const distPath = path.join(rootDir, 'dist')
app.use(express.static(distPath))

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) next()
  })
})

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
  if (process.env.NODE_ENV !== 'production') {
    console.log(`  Admin: http://localhost:5173/mza (with Vite dev proxy)`)
  }
})
