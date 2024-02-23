import admin from 'firebase-admin'
import { ConditionMessage } from 'firebase-admin/lib/messaging/messaging-api'
/**
 * Send a message to the devices corresponding to the provided
 * registration tokens.
 *
 * @param {*} data
 */
export const sendNotificationToClient = (data: ConditionMessage) => {
	admin
		.messaging()
		.send(data)
		.then((response) => {
			console.log(response)
		})
		.catch((error) => {
			console.log('Error sending message:', error)
		})
}