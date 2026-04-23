import express from "express";
import registerCustomerController from "../controllers/registerCustomersController.js";

const router = express.Router();

router.route("/")
.post(registerCustomerController.register);
router.route("/verifyCodeEmail").post(registerCustomerController.verifyCode);

export default router;