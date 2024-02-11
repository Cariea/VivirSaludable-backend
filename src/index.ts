import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { PORT } from './config'
import { router } from './api/_routes/api'
import fileUpload from 'express-fileupload'
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
const userIdToSocket = new Map<string,string>()
const socketToUserId = new Map<string,string>()
const pendingMessages = new Map<string, Array<any>>()
io.on('connection', (socket) => {
	console.log(`Nuevo cliente conectado: ${socket.id}, Usuario: ${socket.handshake.query.userId}`)
  
	socketToUserId.set(socket.id, socket.handshake.query.userId as string)
	userIdToSocket.set(socket.handshake.query.userId as string, socket.id)

	socket.on('disconnect', () => {
		console.log(`Se desconecto: ${socketToUserId.get(socket.id)}`)
		userIdToSocket.delete(socketToUserId.get(socket.id) as string)
		socketToUserId.delete(socket.id)
		console.log(userIdToSocket)
		console.log(socketToUserId)
	})

	socket.on('chat message', (message) => {
		if(userIdToSocket.get(message.to)){
			console.log('Mensaje enviado de: ', socketToUserId.get(socket.id), 'a:', message.to)
		}{
			console.log('Mensaje enviado de: ', socketToUserId.get(socket.id), 'a:', message.to, 'no se encuentra conectado')
			pendingMessages.set(message.to, pendingMessages.get(message.to) ? [...pendingMessages.get(message.to) as any, message] : [message])
			console.log(pendingMessages)
		}

		//io.to(onlineUsers.get(socket.id)).emit('chat message', message
		// Puedes emitir el mensaje a todos los usuarios conectados, por ejemplo:
		// io.emit('chat message', message)
	})
})

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
