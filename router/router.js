import express from 'express'
import { navigate, getRooms } from '../controller/roomController.js'
const router = express.Router()
router.get("/navigateWithInstructions",navigate)
router.get("/getRooms/id=:id", getRooms)




export default router