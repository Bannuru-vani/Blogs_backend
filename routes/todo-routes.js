const router = require('express').Router()
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo-controller')

// Create a new ToDo - Public
router.route('/create').post(createTodo)

// Get all ToDos - Public
router.route('/all').get(getTodos)

// Get, Update, or Delete a single ToDo by ID - Public
router.route('/:id').put(updateTodo).delete(deleteTodo)
module.exports = router
