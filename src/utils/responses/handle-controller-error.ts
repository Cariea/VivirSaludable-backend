import { Response } from 'express'
import { StatusError } from './status-error'
import { errorResponse } from '.'
import { STATUS } from '../constants'

export function handleControllerError (error: any, res: Response): Response {
  if (error instanceof StatusError) {
    return errorResponse(res, error.getStatus(), error.message)
  }

  return errorResponse(res, STATUS.INTERNAL_SERVER_ERROR, error)
}
