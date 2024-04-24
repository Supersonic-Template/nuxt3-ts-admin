import express from "express";
import session from 'express-session'
import passport from 'passport'

import routes from './routes'

const DEFAULT_SECRET = 'sh_secret'

function initializeApplication() {
  const app = express()

  app.disable('x-powered-by')

  /**
   * Set up middlewares.
   */
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    session({
      name: 'app',
      secret: DEFAULT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.use("*", (req, res, next) => {
    //允许任何请求地址访问
    res.setHeader("Access-Control-Allow-Origin", "*")
    //允许任何请求携带自定义数据访问
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next()
  })

  app.use(passport.initialize())
  app.use(passport.session())

  /**
   * Set app routes.
   */

  // Mount path **must** be same as path of serverMiddleware
  // https://github.com/nuxt/framework/issues/4591
  routes(app)

  return app
}

const app = initializeApplication()

const nodeApp = fromNodeMiddleware(app)

export default nodeApp
