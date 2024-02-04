import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { STATUS } from '../utils/constants'
import { AUTH_SECRET } from '../config'
import { errorResponse } from '../utils/responses'

// Revisar 🔥
interface ExtendedRequestUser {
  id: number
  name: string
  email: string
  role: string
  iat: number
  exp: number
}

export interface ExtendedRequest extends Request {
  user?: ExtendedRequestUser
  // Esta propiedad almacenará la información del usuario decodificada
}

export const verifyToken = () =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split(' ')[1]

    try {
      jwt.verify(String(token), String(AUTH_SECRET))
      const decoded = jwt.decode(String(token))
      req.user = decoded as ExtendedRequestUser
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'Error al decodificar el token')
    }
  }

export const hasAuthorization = (validRole: string) =>
  (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    try {
      // Punto Critico
      const role = req.user?.role
      // --
      console.log(role)
      if (role !== `${validRole}`) {
        return errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
      }
      return next()
    } catch (error) {
      errorResponse(res, STATUS.UNAUTHORIZED, 'No autorizado para realizar esta acción')
    }
  }
