/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`) })
console.log(path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`))

// Auth
export const AUTH_SECRET = process.env.AUTH_SECRET
export const AUTH_EXPIRE = process.env.AUTH_EXPIRE
export const AUTH_ROUNDS = process.env.AUTH_ROUNDS

// Servers
export const PORT = process.env.PORT

// Database
export const DATABASE_URL = process.env.DATABASE_URL

// Cloud
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// Frontend
export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL

// Horus
export const BOT_TOKEN = process.env.BOT_TOKEN
export const CHAT_ID = process.env.CHAT_ID