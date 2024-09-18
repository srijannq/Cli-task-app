#!/usr/bin/env node

import { getAll, addTasks, updateTaskStatus } from "./controllers/tasks.js";

const command = process.argv[2];

if (command === "getAll") {
  console.log(getAll());
}
if (command === "add") {
  console.log(addTasks(process.argv[3]));
}
if (command === "update") {
  updateTaskStatus(+process.argv[3], process.argv[4]);
}
