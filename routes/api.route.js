import {Router} from 'express'

export const apiRouter = Router()

import {api, status} from '../controllers/api.controller.js'

apiRouter.get('/', api)

apiRouter.get('/status', status)