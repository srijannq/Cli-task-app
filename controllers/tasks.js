import { stringify } from 'querystring'
import { db, dbFilePath } from './dbContent.js'
import fs from 'fs'
import { readDB, writeDB } from './dbOperations.js'
const date = new Date()
const formattedDate = date.toLocaleString()
export const getAll = () => {
  return readDB()
}
export const getTodo = () => {
  const todoNotes = db.notes.filter((note) => note.status === 'todo')
  return todoNotes
}
export const getDone = () => {
  const doneNotes = db.notes.filter((note) => note.status === 'done')
  return doneNotes
}
export const getInProgress = () => {
  const inProgressNotes = db.notes.filter(
    (note) => note.status === 'in progress',
  )
  return inProgressNotes
}

export const addTasks = (task) => {
  const id = db.notes.length > 0 ? db.notes[db.notes.length - 1].id : 0

  db.notes.push({
    id: id + 1,
    description: task,
    status: 'todo',
    createdAt: formattedDate,
    updatedAt: formattedDate,
  })
  writeDB()
  console.log(`Task added successfully id ${id + 1}`)
}

export const updateTask = (id, task) => {
  const taskIndex = db.notes.findIndex((note) => note.id === id)
  if (taskIndex !== -1) {
    db.notes[taskIndex].description = task
    db.notes[taskIndex].updatedAt = date.toLocaleString()
    console.log('Task status updated!')
    writeDB()
  } else {
    console.log("Task id doesn't exitst")
  }
}
export const deleteTask = (id) => {
  const taskIndex = db.notes.findIndex((note) => note.id === id)
  if (taskIndex !== -1) {
    db.notes.splice(taskIndex, 1)
    console.log('Task successfully deleted')
    writeDB()
  } else {
    console.log("Task doesn't exist")
  }
}
export const markProgress = (id) => {
  const taskId = db.notes.findIndex((note) => note.id === id)
  if (taskId !== -1) {
    db.notes[taskId].status = 'in progress'
    db.notes[taskId].updatedAt = formattedDate
    writeDB()
    console.log(`The status of task with id ${id} is changed `)
  } else {
    console.log("Task Id doesn't exist")
  }
}
export const markDone = (id) => {
  const taskId = db.notes.findIndex((note) => note.id === id)
  if (taskId !== -1) {
    db.notes[taskId].status = 'done'
    db.notes[taskId].updatedAt = formattedDate
    writeDB()
    console.log(`The status of task with id ${id} is changed `)
  } else {
    console.log("Task Id doesn't exist")
  }
}
