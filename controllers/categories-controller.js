const asyncHandler = require('../middlewares/asyncHandler')
const Categories = require('../models/Categories')
const httpError = require('../utils/httpError')
const Blog = require('../models/Blog')
const mongoose = require('mongoose')

//#region ~ GET - /api/v1/categories/all - GET all Categories - PUBLIC -
exports.getCategories = asyncHandler(async (req, res, next) => {
  const cats = await Categories.find()
  return res.status(200).json({ cats })
})
//#endregion

//#region ~ PUT - /api/v1/categories/:id - GET all Blog - PUBLIC -
exports.updateSlug = asyncHandler(async (req, res, next) => {
  let cat = await Categories.findById(req.params.id)
  cat.slug = cat.name.replace(/\W+/g, '-').toLowerCase()
  await cat.save()
  return res.status(200).json({ message: 'slug updated!' })
})
//#endregion

//#region ~ GET - /api/v1/categories/:id/blog - GET all Blog - PUBLIC -
exports.getBlogsByCategoriesId = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({
    category: { $in: [mongoose.Types.ObjectId(req.params.id)] },
  })
  return res.status(200).json({ blogs })
})
//#endregion
