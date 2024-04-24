import type { Method, RouteConfig } from '../../routes/resourceHelper'
import type { Request, Response, NextFunction } from 'express'

const getDify = (_req: Request, res: Response, _next: NextFunction) => {
  if (_req) {
    res.json({ code: 200, data: {} })
  } else {
    res.json({ code: 400, data: {} })
  }
}

// Mounted in routes.ts
export const routes: RouteConfig = {
  routes: [
    { method: 'post' as Method, path: '/getDify', handler: getDify, }
  ],
}

export default routes
