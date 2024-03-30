import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { addMessage } from '../api/messages/actions/add.action'




export const chat = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
	const userIdToSocket = new Map<string, string>()
	const socketToUserId = new Map<string, string>()
	io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
		console.log(`Nuevo cliente conectado: ${socket.id}, Usuario: ${socket.handshake.query.userId}`)
    
		if(userIdToSocket.get(socket.handshake.query.userId as string)){
			console.log(`Usuario: ${socket.handshake.query.userId} ya estaba conectado en el socket: ${userIdToSocket.get(socket.handshake.query.userId as string)} Se desconecto y se conecto en el socket: ${socket.id}`)
			socketToUserId.delete(userIdToSocket.get(socket.handshake.query.userId as string) as string)
			userIdToSocket.delete(socket.handshake.query.userId as string)
		}
		socketToUserId.set(socket.id, socket.handshake.query.userId as string)
		userIdToSocket.set(socket.handshake.query.userId as string, socket.id)

		socket.on('disconnect', () => {
			console.log(`Se desconecto: ${socketToUserId.get(socket.id)}`)
			userIdToSocket.delete(socketToUserId.get(socket.id) as string)
			socketToUserId.delete(socket.id)
		})
		socket.on('chat message', (message) => {
			if (userIdToSocket.get(message.to)) {
				addMessage(socketToUserId.get(socket.id) as string, message.to, message.text)
				io.to(userIdToSocket.get(message.to) as string).emit('chat message', message)
			} else {
				addMessage(socketToUserId.get(socket.id) as string, message.to, message.text)
				console.log('Mensaje enviado de: ', socketToUserId.get(socket.id), 'a:', message.to, 'no se encuentra conectado')
			}
		})
	})
}
//