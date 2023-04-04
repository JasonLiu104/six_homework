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
  async getPosts (query) {
    const timeSort = query.timeSort === 'asc' ? 'asc' : 'desc'
    const q = query !== undefined ? { content: new RegExp(query.q) } : {}
    const posts = await modelPosts.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort({ createAt: timeSort })
    return posts
  }
}

module.exports = controllerPost
