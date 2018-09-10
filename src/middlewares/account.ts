import { Request, Response } from 'express'

export default function AccountMiddleware() {

  function validateGetFunction(req: Request, res: Response, next) {

    if (req.headers.username == 'mehran') {
      if (req.params.id < 0) {
        return res.status(400).json({ error: 'invalid param!' })
      }

      req.params.name = 'mehran'
      return next()
    }

    return res.status(403).json({ error: 'Authentication failed!' })
  }

  return { validateGetFunction }
}