const express = require('express')
const router = express.Router()
const serviceError = require('@/services/serviceError')
const controllerExample = require('@/controllers/controllerExample')
const serviceResponse = require('@/services/serviceResponse')
router.get(
  '/',
  serviceError.asyncError((req, res, next) => {
    /**
     * #swagger.tags = ['Example']
     * #swagger.summary = '取得範例資料'
     * #swagger.description = '取得範例資料'
     * #swagger.responses[200] = {
        description: '回傳範例資料',
        schema: {
          "status": true,
          "data": "Hello World",
        }
      }
     */
    const result = controllerExample.get()
    serviceResponse.success(res, result)
  })
)

module.exports = router
