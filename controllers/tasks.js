import { stringify } from "querystring";
import { db, dbFilePath } from "../dbContent.js";
import fs from "fs";

const date = new Date();
const formattedDate = date.toLocaleString();
export const getAll = () => {
  return JSON.stringify(db, null, 2);
};

export const addTasks = (task) => {
  const id = db.notes.length;

  db.notes.push({
    id: id + 1,
    description: task,
    status: "todo",
    createdAt: formattedDate,
    updatedAt: formattedDate,
  });
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
  return id + 1;
};

export const updateTaskStatus = (id, task) => {
  const taskIndex = db.notes.findIndex((note) => note.id === id);
  if (taskIndex !== -1) {
    db.notes[taskIndex].description = task;
    db.notes[taskIndex].updatedAt = date.toLocaleString();
    console.log("Task status updated!");
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
  } else {
    console.log("Task id doesn't exitst");
  }
};
export const deleteTask = (id) => {
  const taskIndex = db.notes.findIndex((note) => note.id === id);
  if (taskIndex !== -1) {
    db.notes.splice(taskIndex, 1);
    console.log("Task successfully deleted");
  } else {
    console.log("Task doesn't exist");
  }
};
