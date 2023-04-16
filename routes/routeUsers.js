const express = require('express')
const router = express.Router()
const serviceError = require('@/services/serviceError')
const serviceResponse = require('@/services/serviceResponse')
const validator = require('validator')
const controllerUsers = require('@/controllers/controllerUsers')
const serviceJWT = require('@/services/serviceJWT')
const middlewareAuth = require('@/middlewares/middlewareAuth')
router.post(
  '/sign_up',
  serviceError.asyncError(async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    // 驗證
    if (!name || !email || !password || !confirmPassword) {
      serviceResponse.error(400, '欄位不可為空')
    }

    if (password !== confirmPassword) {
      serviceResponse.error(400, '密碼不一致', next)
    }

    if (!validator.isLength(password, { min: 8 })) {
      serviceResponse.error(400, '密碼長度至少8位', next)
    }

    if (!validator.isEmail(email)) {
      serviceResponse.error(400, '信箱格式錯誤', next)
    }

    next()
  }),
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '使用者註冊'
     * #swagger.description = '使用者註冊'
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: '註冊資訊',
        schema: {
            "name":"jason",
            "email":"jason@gmail.com",
            "confirmPassword":"jason",
            "password":"jason"
         }
      }
     * #swagger.responses[200] = {
        description: '回傳註冊資訊與token',
        schema: {
          "status": true,
          "data": {
              "user": {
                "name": "jason",
                "email": "z27089433@gmail.com",
                "photo": "",
                "password": "$2a$12$1/vlSkyJDXkJFkgUlHCqPOMlUaW3mXibBOj/mcH0AKCKzm42KuULa",
                "_id": "643b854fadd06971aca8a0df"
              },
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2I4NTRmYWRkMDY5NzFhY2E4YTBkZiIsImlhdCI6MTY4MTYyODc2NywiZXhwIjoxNjg0MjIwNzY3fQ.jgzymQFGUEraIaLDl4dOPRvaPb_H3yZLYZ4JVMrrrPM"
          }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE2MjgyNDAsImV4cCI6MTY4NDIyMDI0MH0.gwSnMNRmu20n4OWW_-_oEI81RjWH_9ZB5RwvPP2cHbE"
          },
        }
      }
     */
    const { name, email, password } = req.body
    const newUser = await controllerUsers.signUp(name, email, password)
    const token = serviceJWT.generateJWT(newUser)
    serviceResponse.success(res, {
      user: newUser,
      token
    })
  })
)

router.post(
  '/sign_in',
  serviceError.asyncError(async (req, res, next) => {
    const { email, password } = req.body
    // 驗證
    if (!email || !password) {
      serviceResponse.error(400, '欄位不可為空', next)
    }

    if (!validator.isLength(password, { min: 8 })) {
      serviceResponse.error(400, '密碼長度至少8位', next)
    }

    if (!validator.isEmail(email)) {
      serviceResponse.error(400, '信箱格式錯誤', next)
    }

    next()
  }),
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '使用者登入'
     * #swagger.description = '使用者登入'
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: '登入帳密',
        schema: {
            "email":"jason@gmail.com",
            "password":"jason"
         }
      }
     * #swagger.responses[200] = {
        description: '回傳登入者訊息',
        schema: {
          "status": true,
          "data": {
              "user": {
                  "_id": "643b854fadd06971aca8a0df",
                  "user": "jason",
                  "email": "z27089433@gmail.com",
                  "photo": "123"
              },
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2I4NTRmYWRkMDY5NzFhY2E4YTBkZiIsImlhdCI6MTY4MTYyODc2NywiZXhwIjoxNjg0MjIwNzY3fQ.jgzymQFGUEraIaLDl4dOPRvaPb_H3yZLYZ4JVMrrrPM"
          }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE2MjgyNDAsImV4cCI6MTY4NDIyMDI0MH0.gwSnMNRmu20n4OWW_-_oEI81RjWH_9ZB5RwvPP2cHbE"
          },
        }
      }
     */
    const { email, password } = req.body
    const newUser = await controllerUsers.signIn(email, password)
    const token = serviceJWT.generateJWT(newUser)
    serviceResponse.success(res, {
      user: newUser,
      token
    })
  })
)

router.patch(
  '/update_password',
  serviceError.asyncError(async (req, res, next) => {
    const { email, password, passwordNew } = req.body
    // 驗證
    if (!email || !password || !passwordNew) {
      serviceResponse.error(400, '欄位不可為空', next)
    }

    if (!validator.isLength(password, { min: 8 }) || !validator.isLength(passwordNew, { min: 8 })) {
      serviceResponse.error(400, '密碼長度至少8位', next)
    }

    if (!validator.isEmail(email)) {
      serviceResponse.error(400, '信箱格式錯誤', next)
    }

    next()
  }),
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '更新使用者密碼'
     * #swagger.description = '更新使用者密碼'
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: '使用者新舊帳密與email',
        schema: {
            "email":"jason@gmail.com",
            "password":"jason",
            "passwordNew":"jason"
         }
      }
     * #swagger.responses[200] = {
        description: '回傳更新成功與否',
        schema: {
          "status": true,
          "data": {
            "isUpdate": true
          }
        }
      }
     */
    const { email, password, passwordNew } = req.body
    const result = await controllerUsers.updatePassword(email, password, passwordNew)
    serviceResponse.success(res, result)
  })
)

router.patch(
  '/profile',
  serviceError.asyncError(async (req, res, next) => {
    const { name, photo } = req.body
    if (!name && !photo) {
      serviceResponse.error(400, '欄位不可為空', next)
    }

    next()
  }),
  middlewareAuth,
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '更新登入者訊息'
     * #swagger.description = '更新登入者訊息'
     * #swagger.security = [{
        "apiKeyAuth": []
      }]
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: '登入者訊息',
        schema: {
            "name":"jason",
            "photo":"jason"
         }
      }
     * #swagger.responses[200] = {
        description: '回傳登入訊息與token',
        schema: {
          "status": true,
          "data": {
            "user": {
              "_id": "643b854fadd06971aca8a0df",
              "email": "jason@gmail.com",
              "name": "jason",
              "photo": "123"
            }
          }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODE2MjgyNDAsImV4cCI6MTY4NDIyMDI0MH0.gwSnMNRmu20n4OWW_-_oEI81RjWH_9ZB5RwvPP2cHbE"
          }
        }
      }
     */
    const { name, photo } = req.body
    const { id } = req.user
    const updatedUser = await controllerUsers.updateProfile(id, name, photo)
    const token = serviceJWT.generateJWT(updatedUser)
    serviceResponse.success(res, {
      user: updatedUser,
      token
    })
  })
)

router.get('/profile',
  middlewareAuth,
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Users']
     * #swagger.summary = '登入者訊息'
     * #swagger.description = '登入者訊息'
     * #swagger.security = [{
        "apiKeyAuth": []
      }]
     * #swagger.responses[200] = {
        description: '回傳登入者訊息',
        schema: {
          "status": true,
          "data": {
              "user": {
              "_id": "643b854fadd06971aca8a0df",
              "name": "jason",
              "email": "z27089433@gmail.com",
              "photo": "123"
            }
          }
        }
      }
     */
    const { id } = req.user
    const user = await controllerUsers.getProfile(id)
    serviceResponse.success(res, user)
  }))

module.exports = router
