import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { addMessage } from '../api/messages/actions/add.action'




export const chat = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
	const userIdToSocket = new Map<string, string>()
	const socketToUserId = new Map<string, string>()
	io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
		console.log(`Nuevo cliente conectado: ${socket.id}, Usuario: ${socket.handshake.query.userId}`)
		const userId = socket.handshake.query.userId as string
		const existingSocketId = userIdToSocket.get(userId)
		if (existingSocketId && existingSocketId !== socket.id) {
			socketToUserId.delete(existingSocketId)
		}
		socketToUserId.set(socket.id, userId)
		userIdToSocket.set(userId, socket.id)

		console.log('socketToUserId', socketToUserId)
		console.log('userIdToSocket', userIdToSocket)

		socket.on('disconnect', () => {
			console.log(`Se desconecto: ${userId}`)
			userIdToSocket.delete(userId)
			socketToUserId.delete(socket.id)
		})
		socket.on('chat message', (message) => {
			if (userIdToSocket.get(message.to)) {
				addMessage(socketToUserId.get(socket.id) as string, message.to, message.text)
				io.to(userIdToSocket.get(message.to) as string).emit('chat message', message)
			} else {
				addMessage(socketToUserId.get(socket.id) as string, message.to, message.text)
				console.log('Mensaje enviado de: ', userId, 'a:', message.to, 'no se encuentra conectado')
			}
		})
	})
}

//