import "dotenv/config"

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.NODE_ENV === 'development'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const FRONTEND_URL = process.env.NODE_ENV === 'development'
  ? process.env.DEV_FRONTEND_URL
  : process.env.PROD_FRONTEND_URL

export default {
    PORT,
    MONGODB_URI,
    FRONTEND_URL
}