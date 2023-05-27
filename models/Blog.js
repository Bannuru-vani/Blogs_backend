const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide blog title.'],
  },
  subTitle: {
    type: String,
    required: [true, 'Please provide blog subtitle.'],
  },
  content: {
    type: String,
    required: [true, 'Content of the blog is required.'],
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags: { type: Array },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  stage: {
    type: String,
    enum: ['draft', 'publish'],
    default: 'draft',
  },
  claps: { type: Number },
  postedDate: { type: Date },
  updatedAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

BlogSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  console.log('tgggis')
  next()
})

module.exports = mongoose.model('Blog', BlogSchema)
