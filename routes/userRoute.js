import express from "express";
import * as userController from "../controllers/userController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/register").post(userController.createUser);      // Register a tiklayinca kayit islemi gerceklesir.
router.route("/login").post(userController.loginUser);
router.route("/dashboard").get(authMiddleware.authenticateToken ,userController.getDashboardPage);



export default router;