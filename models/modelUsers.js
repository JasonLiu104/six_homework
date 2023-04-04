const mongoose = require('mongoose')

const modelExample = mongoose.model(
  'user',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false
    },
    photo: String
  }, { versionKey: false })
)

module.exports = modelExample
