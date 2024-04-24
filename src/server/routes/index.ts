import express from 'express'

import { errorHandler as defaultErrorHandler, PageNotFoundHandler } from '../middlewares/errorHandler'
import { createResource } from '../routes/resourceHelper'

import appRoutes from '../controllers/app'

export default (app: express.Application) => {
  const router = express.Router({ caseSensitive: true, mergeParams: true })

  router.use('/app', createResource(appRoutes))


  // Mount with version
  router.use(PageNotFoundHandler)
  router.use(defaultErrorHandler)

  app.use('/server/api', router)
}
