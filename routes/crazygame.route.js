import {Router} from 'express'

export const crazygameRouter = Router()

import { postaddCrazyGame, getAllCrazyGames, getCrazyGames, getCrazyGameById, putEditCrazyGame, deleteCrazyGame } from '../controllers/crazygame.controller.js'



crazygameRouter.post('/', postaddCrazyGame)

crazygameRouter.get('/', getAllCrazyGames)

crazygameRouter.get('/async', getCrazyGames)

crazygameRouter.get('/id', getCrazyGameById)


crazygameRouter.put('/update', putEditCrazyGame)


crazygameRouter.delete('/delete', deleteCrazyGame)
