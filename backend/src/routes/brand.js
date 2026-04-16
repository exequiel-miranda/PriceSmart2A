import express from "express";
import brandController from "../controllers/brandsController.js";


//Ocupo Router() para asignar los métodos
const router = express.Router();

router
  .route("/")
  .get(brandController.getBrand)
  .post(brandController.insertBrands);

router
  .route("/:id")
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand);

export default router;


