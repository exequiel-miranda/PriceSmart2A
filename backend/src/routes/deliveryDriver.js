import express from "express";
import deliveryDriverController from "../controllers/deliveryDriverController.js";
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(deliveryDriverController.getAllDrivers)
.post(upload.single("image"), deliveryDriverController.insertDriver)

router.route("/:id")
.put(upload.single("image"),deliveryDriverController.updateDriver)
.delete(deliveryDriverController.deleteDriver)

export default router
