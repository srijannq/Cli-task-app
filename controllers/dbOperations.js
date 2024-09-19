import fs from 'fs'
import { dbFilePath, db } from './dbContent.js'

export const readDB = () => {
  return db
}

export const writeDB = () => {
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2))
}
