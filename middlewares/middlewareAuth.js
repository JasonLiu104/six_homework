const serviceResponse = require('@/services/serviceResponse')
const serviceError = require('@/services/serviceError')
const modelUsers = require('@/models/modelUsers')
const serviceJWT = require('@/services/serviceJWT')
// Middleware to authenticate user
const middlewareAuth = serviceError.asyncError(async (req, res, next) => {
  let token = null
  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // If no token is present, return an error
  if (!token) {
    serviceResponse.error(400, '沒有權限', next)
  }
  // Decode the token
  const decode = await serviceJWT.decode(token)
  // Find the user by ID
  const currentUser = await modelUsers.findById(decode.id)
  // If no user is found, return an error
  if (!currentUser) {
    serviceResponse.error(400, '沒有權限', next)
  }
  // Set the user in the request object
  req.user = currentUser
  // Call the next middleware
  next()
})

module.exports = middlewareAuth
