import express from "express";

import recoverypasswordController from "../controllers/RecoveryPassword";

const router = express.Router();

router.route("/requestCode").post(recoverypasswordController.requestCode)
router.route("/verifyCode").post(recoverypasswordController.Verifiedcode)
router.route("/newPassword").post(recoverypasswordController.newPassword)
