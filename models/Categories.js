const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide category name'],
  },
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

//#region ~ Create slug for category :-}
// Using function key-word insted of arrow function to use "this" to get Users properties
CategorySchema.pre('save', async function (next) {
  console.log('first')
  const slug = this.name.replace(/\W+/g, '-').toLowerCase()
  this.slug = slug
  next()
})
//#endregion

module.exports = mongoose.model('Category', CategorySchema)
