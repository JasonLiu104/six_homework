const modelPosts = require('@/models/modelPosts')
const modelUsers = require('@/models/modelUsers')
const controllerPost = {
  async insertPost (user, content, image) {
    const newPost = await modelPosts.create({
      user,
      content
    })
    return newPost
  },
  async getPosts () {
    const posts = await modelPosts.find().populate({
      path: 'user',
      select: 'name photo'
    })
    return posts
  }
}

module.exports = controllerPost
