import express from 'express'
import { navigate, getRooms, getNearestHelper } from '../controller/roomController.js'
const router = express.Router()
router.get("/navigateWithInstructions",navigate)
router.get("/getRooms/id=:id", getRooms)
router.get("/getNearestHelper/currRoom=:currRoom", getNearestHelper)




export default router