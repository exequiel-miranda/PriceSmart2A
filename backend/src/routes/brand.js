import express from 'express'
import  brandController from '../controllers/brandsController.js'

//ocupo router para asignar los metodos a cada ruta
const router = express.Router()

router.route('/')
.get(brandController.getBrands)
.post(brandController.postBrand)

router.route('/:id')
.put(brandController.updateBrand)
.delete(brandController.deleteBrand)



export default router