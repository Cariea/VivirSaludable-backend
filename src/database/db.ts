import { Pool } from 'pg'
import { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD } from '../config'

export const pool = new Pool({
	host:DATABASE_HOST,
	user:DATABASE_USER,
	password:DATABASE_PASSWORD,
	database:DATABASE_NAME,
	port: Number(DATABASE_PORT),
	ssl: false
})
