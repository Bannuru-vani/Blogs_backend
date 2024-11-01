const asyncHandler = require('../middlewares/asyncHandler')
const Todo = require('../models/Todo')

//#region ~ GET - /api/v1/todo/all - GET all Todos - PUBLIC -
exports.getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find()
  return res.status(200).json({ todos })
})
//#endregion

//#region ~ POST - /api/v1/todo/create - Create ToDo - Public ~
exports.createTodo = asyncHandler(async (req, res, next) => {
  let { task, due_date, tags, priority } = req.body

  const todo = await Todo.create({
    task,
    priority,
  })

  return res
    .status(201)
    .json({ message: `Task "${task}" has been created!`, todo })
})
//#endregion

//#region ~ PUT - /api/v1/todo/:id - Update ToDo - Public ~
exports.updateTodo = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const updates = req.body

  const todo = await Todo.findByIdAndUpdate(
    id,
    { ...updates, updated_date: Date.now() },
    { new: true }
  )
  if (!todo) {
    return res.status(404).json({ message: 'ToDo item not found!' })
  }

  return res
    .status(200)
    .json({ message: `Task "${todo.task}" has been updated!`, todo })
})
//#endregion

//#region ~ DELETE - /api/v1/todo/:id - Delete ToDo - Public ~
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const todo = await Todo.findById(id)
  if (!todo) {
    return next(
      new Error('The ToDo item you are trying to delete does not exist!', 403)
    )
  }

  await Todo.deleteOne({ _id: id })

  return res
    .status(200)
    .json({ message: `Task "${todo.task}" has been deleted!` })
})
//#endregion
