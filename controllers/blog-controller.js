const Blog = require('../models/Blog')
const asyncHandler = require('../middlewares/asyncHandler')
const httpError = require('../utils/httpError')

//#region ~ POST - /api/v1/blog/create - Create Blog - PRIVATE -
exports.createBlog = asyncHandler(async (req, res, next) => {
  let { title, subTitle, author, tags, category, content } = req.body
  author = req.user._id
  console.log({ title, subTitle, author, tags, category, content })
  const blog = await Blog.create({
    title,
    subTitle,
    author,
    tags,
    category,
    content,
  })
  return res.status(201).json({ message: `${title} is added to Draft` })
})
//#endregion

//#region ~ PUT - /api/v1/blog/:id - Update Blog - PRIVATE -
exports.updateBlog = asyncHandler(async (req, res, next) => {
  let body = req.body
  let { id } = req.params
  author = req.user._id
  let fieldesToUpdate = {}
  Object.keys(body).forEach((key) => {
    if (body[key]) {
      fieldesToUpdate[key] = body[key]
    }
  })

  console.log(fieldesToUpdate)
  // let toBeUpdatedFieldes = {};

  const blog = await Blog.findByIdAndUpdate(id, {
    ...fieldesToUpdate,
    updatedAt: Date.now(),
  })
  // update the updatedat timing

  console.log(blog)
  return res.status(200).json({ message: `${blog.title} is updated!` })
})
//#endregion

//#region ~ DELETE - /api/v1/blog/:id - Delete Blog - PRIVATE -
exports.deleteBlog = asyncHandler(async (req, res, next) => {
  let { id } = req.params
  author = req.user._id
  let blog = await Blog.findById(id)
  if (!blog) {
    return next(
      new httpError('The Blog you are trying to delete is not exist!', 403)
    )
  }
  if (blog.author.toString() === author.toString()) {
    let res = await Blog.deleteOne({ _id: id })
  } else {
    return next(
      new httpError('You are not authorised to delete this blog!', 403)
    )
  }
  return res.status(200).json({ message: `${blog.title} test delete!` })
})
//#endregion

//#region ~ PUT - /api/v1/blog/publish/:id - Publish the Blog - PRIVATE -
exports.publishBlog = asyncHandler(async (req, res, next) => {
  let { id } = req.params

  const blog = await Blog.findByIdAndUpdate(id, {
    stage: 'publish',
  })

  if (!blog) {
    return next(
      new httpError("The Blog you are trying to publish doesn't exist!", 403)
    )
  }
  return res.status(200).json({ message: `${blog.title} Published!` })
})
//#endregion

//#region ~ GET - /api/v1/blog/all - GET all Blog - PUBLIC -
exports.getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find()
  return res.status(200).json({ blogs })
})
//#endregion

//#region ~ GET - /api/v1/blog/:id - GET a Blog - PUBLIC -
exports.getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const blog = await Blog.findById(id)
  if (!blog) {
    return next(
      new httpError("The Blog you are trying to find doesn't exist!", 403)
    )
  }
  return res.status(200).json(blog)
})
//#endregion

//#region ~ GET - /api/v1/blog/myblogs - GET all user Blogs - PRIVATE -
exports.getMyBlogs = asyncHandler(async (req, res, next) => {
  let author = req.user._id
  const blogs = await Blog.find({ author })
  return res.status(200).json(blogs)
})
//#endregion

// TODO: Need to implement claps and likes
// Likes is to upload user id intlo likes Object
// Claps is to increase the blogs claps count by 1 on every hit

//#region ~ PUT - /api/v1/blog/clap/:id - Add a clap to the Blog - PUBLIC -
exports.addAClapBlog = asyncHandler(async (req, res, next) => {
  let { id } = req.params

  const blog = await Blog.findByIdAndUpdate(id, { $inc: { claps: 1 } })
  // const blog = await Blog.findByIdAndUpdate(id, { claps: 1 });
  if (!blog) {
    return next(
      new httpError("The Blog you are trying to Clap doesn't exist!", 403)
    )
  }
  return res.status(200).json({ message: `${blog.title} is Appriciated!` })
})
//#endregion

//#region ~ PUT - /api/v1/blog/like/:id - Add a Like to the Blog - PRIVAte -
exports.addALikeBlog = asyncHandler(async (req, res, next) => {
  let { id } = req.params

  let user = req.user._id
  const blog = await Blog.findByIdAndUpdate(id, {
    $addToSet: { likes: user },
  })
  if (!blog) {
    return next(
      new httpError("The Blog you are trying to Like doesn't exist!", 403)
    )
  }
  return res.status(200).json({ message: `${blog.title} is Liked!` })
})
//#endregion
