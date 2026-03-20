import express from 'express'
import adminsController from '../controllers/adminsControllers.js'

const router = express.Router()

router.route('/')
.get(adminsController.getAdmins)
.post(adminsController.postAdmin)

router.route('/:id')
.put(adminsController.updateAdmin)
.delete(adminsController.deleteAdmin)

export default router