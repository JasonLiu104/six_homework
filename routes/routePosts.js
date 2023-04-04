const express = require('express')
const router = express.Router()
const serviceError = require('@/services/serviceError')
const controllerPosts = require('@/controllers/controllerPosts')
const serviceResponse = require('@/services/serviceResponse')
router.get(
  '/',
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Post']
     * #swagger.summary = '取得貼文列表'
     * #swagger.description = '取得貼文資料'
     * #swagger.parameters['timeSort'] = {
        in: 'query',
        description: '排序方式 asc/desc'
      }
     * #swagger.parameters['q'] = {
        in: 'query',
        description: '模糊搜尋'
      }
     * #swagger.responses[200] = {
        description: '回傳貼文資料',
        schema: {
          "status": true,
          "data": {
            "_id": "642bda33a4ab589d9a9cc291",
            "content": "測試",
            "image": "",
            "user": {
                "_id": "642bd0474819e89ecb878c4a",
                "name": "John",
                "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
            },
            "likes": 0,
            "id": "642bda33a4ab589d9a9cc291"
          },
        }
      }
     */
    const { query } = req
    const result = await controllerPosts.getPosts(query)
    serviceResponse.success(res, result)
  })
)

router.post(
  '/',
  serviceError.asyncError(async (req, res, next) => {
    /**
     * #swagger.tags = ['Post']
     * #swagger.summary = '新增貼文'
     * #swagger.description = '新增貼文資料'
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: 'Add a user',
        schema: {
              "user":"642bd0474819e89ecb878c4a",
              "content":"測試3"
         }
      }
     * #swagger.responses[200] = {
        schema: {
          "status": true,
          "data": {
            "content": "測試3",
            "image": "",
            "createAt": "2023-04-04T08:10:25.698Z",
            "user": "642bd0474819e89ecb878c4a",
            "likes": 0,
            "_id": "642bdba2712ab795131db4e4",
          },
        }
      }
     */
    const { user, content } = req.body
    const result = await controllerPosts.insertPost(user,
      content)
    serviceResponse.success(res, result)
  })
)

module.exports = router
