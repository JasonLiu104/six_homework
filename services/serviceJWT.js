const jwt = require('jsonwebtoken')
const serviceResponse = require('@/services/serviceResponse')
const serviceJWT = {
  generateJWT: (user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_DAY
    })
    return token
  },
  decode: async (token) => {
    const userInfo = await jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw serviceResponse.error(401, '沒有權限')
      } else {
        return payload
      }
    })
    return userInfo
  }
}

module.exports = serviceJWT
