import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { PORT } from './config'
import { router } from './api/_routes/api'
import fileUpload from 'express-fileupload'
import { chat } from './services/chat'
import initializeFirebase from './services/firebase-init'

// App Declaration
const app = express()

// Server Declaration
const server = createServer(app)

// Socket.io
export const io = new Server(server, {
	cors: {
		//origin: '*',
		origin: ['http://127.0.0.1:5500','http://127.0.0.1:5501'],
		methods: ['GET', 'POST'],
		credentials: true
	},
	connectionStateRecovery: {}
})

// Socket.io chat
chat(io)

// Firebase
initializeFirebase()

// Settings
app.set('port', PORT !== '' ? PORT : 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json()) // middleware que transforma la req.body a un json
app.use(cors({
	origin: 'http://127.0.0.1:5500', // Reemplaza esto con el origen correcto de tu aplicación web
	methods: ['GET', 'POST'],
	credentials: true
}))
app.use(fileUpload({
	useTempFiles: false,
	tempFileDir: ''
}))

// Routes
app.use('/', router)

// Starting the server
server.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})
