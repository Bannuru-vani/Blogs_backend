const mongoose = require('mongoose')

const TodoSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task description is required.'],
  },
  current_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
})

TodoSchema.pre('save', function (next) {
  this.updated_date = Date.now()
  next()
})

module.exports = mongoose.model('Todo', TodoSchema)
