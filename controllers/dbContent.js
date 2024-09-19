import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbFilePath = resolve(__dirname, '../db.json')
const dbContent = fs.readFileSync(dbFilePath, 'utf-8')
const db = JSON.parse(dbContent)
export { db, dbFilePath }
