#!/usr/bin/env node

import {
  getAll,
  addTasks,
  deleteTask,
  getTodo,
  getInProgress,
  getDone,
  updateTask,
  markDone,
  markProgress,
} from './controllers/tasks.js'
import yargs from 'yargs'

const listNotes = (tasks) => {
  tasks.forEach((task) => {
    console.log('Description of your task: ', task.description)
    console.log('Your task status: ', task.status)
    console.log('Created At: ', task.createdAt)
    console.log('Last updated At: ', task.updatedAt)
    console.log('\n')
  })
}

yargs(process.argv.slice(2))
  .command(
    'add <task>',
    'add a new task with description',
    (yargs) => {
      return yargs.positional('task', {
        describe: 'The content of the task you want to create',
        type: 'string',
      })
    },
    (argv) => {
      addTasks(argv.task)
    },
  )

  .command(
    'list [status]',
    'list task by status',
    (yargs) => {
      return yargs.positional('status', {
        describe: 'Lists the task as per status/list all the tasks',
        type: 'string',
      })
    },
    (argv) => {
      if (argv.status === 'todo') {
        const tasks = getTodo()
        if (tasks.length === 0) {
          console.log('No such tasks to show')
        } else {
          listNotes(tasks)
        }
      } else if (!argv.status) {
        const { notes } = getAll()
        if (notes.length === 0) {
          console.log('No tasks to show')
        } else {
          listNotes(notes)
        }
      } else if (argv.status === 'in-progress') {
        const tasks = getInProgress()
        if (tasks.length === 0) {
          console.log('No such tasks to show')
        } else {
          listNotes(tasks)
        }
      } else if (argv.status === 'done') {
        const tasks = getDone()
        if (tasks.length === 0) {
          console.log('No such tasks to show')
        } else {
          listNotes(tasks)
        }
      }
    },
  )
  .command(
    'update <id> <description>',
    'change the description of the task identified by id',
    (yargs) => {
      return yargs
        .positional('id', {
          description: 'Id of the task to be updated',
          type: 'number',
        })
        .positional('description', {
          description: 'change the description of the task.',
          type: 'string',
        })
    },
    (argv) => {
      updateTask(argv.id, argv.description)
    },
  )
  .command(
    'mark <id> <status>',
    'change the status of the task identified by id',
    (yargs) => {
      return yargs
        .positional('id', {
          description: 'Id of the task to be updated',
          type: 'number',
        })
        .positional('status', {
          description: 'change the status of the task.',
          type: 'string',
        })
    },
    (argv) => {
      if (argv.status === 'done') {
        markDone(argv.id)
      } else {
        markProgress(argv.id)
      }
    },
  )
  .command(
    'delete <id>',
    'delete the task with specified id',
    (yargs) => {
      return yargs.positional('id', {
        description: 'The id of the task to be deleted',
        type: 'number',
      })
    },
    (argv) => {
      deleteTask(argv.id)
    },
  )

  .parse()
