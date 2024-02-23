import admin from 'firebase-admin'

import { FIREBASE_TYPE, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_CLIENT_ID, FIREBASE_AUTH_URI, FIREBASE_TOKEN_URI, FIREBASE_AUTH_PROVIDER_X509_CERT_URL, FIREBASE_CLIENT_X509_CERT_URL } from '../config/config'
let messaging

if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
	throw new Error('Missing required Firebase configuration variables.')
}


const initializeFirebase = async () => {
	const firebaseConfig = {
		type: FIREBASE_TYPE,
		project_id: FIREBASE_PROJECT_ID,
		private_key_id: FIREBASE_PRIVATE_KEY_ID,
		private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		client_email: FIREBASE_CLIENT_EMAIL,
		client_id: FIREBASE_CLIENT_ID,
		auth_uri: FIREBASE_AUTH_URI,
		token_uri: FIREBASE_TOKEN_URI,
		auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL
	}

	try {
		await admin.initializeApp({
			credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
		})
		messaging = admin.messaging()
		return messaging
	} catch (error) {
		console.error('Error initializing Firebase:', error)
		throw error
	}
}

export default initializeFirebase
export { messaging }