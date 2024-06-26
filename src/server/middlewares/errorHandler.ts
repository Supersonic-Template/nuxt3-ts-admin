import { type Request, type Response } from 'express'
import { getReasonPhrase, StatusCodes } from 'http-status-codes'

const hasProperty = <K extends string>(obj: unknown, key: K): obj is { [M in K]: unknown } => {
  return obj instanceof Object && key in obj
}

export const PageNotFoundHandler = (req: Request, res: Response) => {
  const error = {
    url: req.path,
    statusCode: StatusCodes.NOT_FOUND,
    statusMessage: getReasonPhrase(StatusCodes.NOT_FOUND),
    message: `request path ${req.path} is not found`,
    description: 'check request path',
  }

  return res.status(StatusCodes.NOT_FOUND).json(error)
}

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (!res.headersSent || !req.accepts(['html', 'json', 'text'])) {
    let statusCode = Number(res.statusCode)

    if (err) {
      if (hasProperty(err, 'statusCode')) {
        statusCode = Number(err.statusCode)
      } else if (hasProperty(err, 'code')) {
        statusCode = Number(err.code)
      } else {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
      }
    }

    const errorObject = {
      url: req.path,
      statusCode,
      statusMessage: getReasonPhrase(statusCode),
      message: err.message || err.toString(),
      description: process.env.NODE_ENV === 'development' ? err.stack ?? err.message : '',
    }

    res.type('application/json').sendStatus(statusCode).json(errorObject)
  }
}
