import express from 'express'
import { navigate } from '../controller/roomController.js'
const router = express.Router()
router.get("/navigateWithInstructions",navigate)


export default router