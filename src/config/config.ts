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

// SMTP
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_PORT = process.env.SMTP_PORT
export const SMTP_MAIL = process.env.SMTP_MAIL
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD

// firebase
export const FIREBASE_TYPE = process.env.FIREBASE_TYPE
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
export const FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
export const FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID
export const FIREBASE_AUTH_URI = process.env.FIREBASE_AUTH_URI
export const FIREBASE_TOKEN_URI = process.env.FIREBASE_TOKEN_URI
export const FIREBASE_AUTH_PROVIDER_X509_CERT_URL = process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL
export const FIREBASE_CLIENT_X509_CERT_URL = process.env.FIREBASE_CLIENT_X509_CERT_URL
export const FIREBASE_UNIVERSE_DOMAIN = process.env.FIREBASE_UNIVERSE_DOMAIN

