const mongoose = require('mongoose')

const modelPosts = mongoose.model(
  'post',
  new mongoose.Schema({
    content: {
      type: String,
      required: [true, 'Content 未填寫']
    },
    image: {
      type: String,
      default: ''
    },
    createAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, '貼文姓名未填寫']
    },
    likes: {
      type: Number,
      default: 0
    }
  }, {
    toJSON: {
      versionKey: false,
      virtuals: true
    }
  })
)

module.exports = modelPosts
