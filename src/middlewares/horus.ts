import { Telegraf } from 'telegraf'
import { BOT_TOKEN, CHAT_ID } from '../config/index'
import {Request,Response, NextFunction} from 'express'

export const bot = new Telegraf(BOT_TOKEN as string)
bot.start((ctx) => {

	ctx.reply('Welcome horus')
})

export const horus = () =>
	(req: Request, _res: Response, next: NextFunction): void => {
		try {
			const method = req.method
			const ip = req.ip
			const endpoint = req.originalUrl  
			const params = req.params  
			const query = req.query
			const body = req.body
			const headers = req.headers
			const message =`
      Nueva solicitud recibida:
      - Endpoint: ${endpoint}
      - Parámetros: ${JSON.stringify(params)}
      - Query: ${JSON.stringify(query)}
      - Cuerpo: ${JSON.stringify(body)}
      - Método: ${method}
      - IP: ${ip}
      - Headers: ${JSON.stringify(headers)}
      `
			bot.telegram.sendMessage(Number(CHAT_ID), message)
			return next()
		} catch (error) {
			console.log(error)
		}
	}





