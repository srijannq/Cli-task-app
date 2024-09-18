import fs from "fs";

const dbFilePath = "./db.json";
const dbContent = fs.readFileSync(dbFilePath, "utf-8");
const db = JSON.parse(dbContent);
export { db, dbFilePath };
