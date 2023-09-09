import express from 'express'
import { navigate, getRooms, getHelpers } from '../controller/roomController.js'
const router = express.Router()
router.get("/navigateWithInstructions",navigate)
router.get("/getRooms/id=:id", getRooms)
router.get("/getHelpers", getHelpers)




export default router