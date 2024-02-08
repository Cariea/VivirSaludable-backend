import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { PORT } from './config'
import { router } from './api/_routes/api'

// App Declaration
const app = express()
// Server Declaration
const server = createServer(app)

// Socket.io
export const io = new Server(server, {
	cors: {
		origin: ['http://127.0.0.1:5500'],
		methods: ['GET', 'POST'],
		credentials: true
	},
	allowEIO3: true,
	connectionStateRecovery: {}
})

io.on('connection', (socket) => {
	console.log('New client connected')
	console.log(socket.id)
	socket.on('disconnect', () => {
		console.log('Client disconnected')
	})
})
// const onlineUsers = new Map<string, string>()
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
// Routes
app.use('/', router)

// Starting the server
server.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})
