const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  DATABASE: process.env.DATABASE,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  PORT: process.env.PORT,
  HOST: process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'blog-server-izfg.onrender.com',
  JWT_SECRET: process.env.JWT_SECRET
}
