import nodemailer from 'nodemailer'

import {
	SMTP_HOST,
	SMTP_MAIL,
	SMTP_PASSWORD,
	SMTP_PORT,
} from '../config/config'

export const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: Number(SMTP_PORT),
	secure: false, // upgrade later with STARTTLS
	auth: {
		user: SMTP_MAIL,
		pass: SMTP_PASSWORD,
	},
})

export const sendMail = async (to: string, subject: string, html: string) => {
	try {
		await transporter.sendMail({
			from: SMTP_MAIL,
			to,
			subject,
			html,
		})
	} catch (error) {
		console.error(error)
	}
}