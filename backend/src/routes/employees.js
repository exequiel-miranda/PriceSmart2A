import express from "express";
import employeeController from "../controllers/employeeController.js";

//Uso Router() de la libreria expres
//Router es la función que tiene todos los métodos
// get, post, put, delete, etc

const router = express.Router();

router
  .route("/")
  .get(employeeController.getEmployees)
  .post(employeeController.insertEmployees);

router
  .route("/:id")
  .put(employeeController.updateEmployees)
  .delete(employeeController.deleteEmployee);

export default router;
