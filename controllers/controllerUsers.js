const modelUsers = require('@/models/modelUsers.js')
const bcrypt = require('bcryptjs')
const serviceResponse = require('@/services/serviceResponse.js')

const controllerUsers = {
  async signUp (name, email, password) {
    const bcryptPassword = await bcrypt.hash(password, 12)
    const newUser = await modelUsers.create({
      name, email, password: bcryptPassword
    })
    return newUser
  },
  async signIn (email, password) {
    const user = await modelUsers.findOne({ email }).select('+password')
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw serviceResponse.error(400, '密碼錯誤')
    }
    return {
      _id: user._id,
      user: user.name,
      email: user.email,
      photo: user.photo
    }
  },
  async updatePassword (email, password, passwordNew) {
    const user = await modelUsers.findOne({ email }).select('+password')
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw serviceResponse.error(400, '密碼錯誤')
    }
    // mongodb update user password
    const bcryptPassword = await bcrypt.hash(passwordNew, 12)
    const result = await modelUsers.findOneAndUpdate(
      { email },
      { $set: { password: bcryptPassword } }
    )
    if (!result) {
      throw serviceResponse.error(500, '密碼更新失敗')
    }

    return {
      isUpdate: true
    }
  },
  async updateProfile (id, name, photo) {
    // mongodb update user profile
    const updatedUser = await modelUsers.findByIdAndUpdate(
      id, {
        ...(name ? { name } : {}),
        ...(photo ? { photo } : {})
      }, {
        returnDocument: 'after'
      }
    )

    if (!updatedUser) {
      throw serviceResponse.error(500, '個人資料更新失敗')
    }
    return {
      user: updatedUser
    }
  },
  async getProfile (id) {
    const user = await modelUsers.findById(id)

    if (!user) {
      throw serviceResponse.error(400, '沒有此使用者')
    }
    return {
      user
    }
  }
}

module.exports = controllerUsers
