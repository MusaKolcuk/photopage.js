import express from "express";
import * as userController from "../controllers/userController.js"

const router = express.Router();

router.route("/register").post(userController.createUser);      // Register a tiklayinca kayit islemi gerceklesir.
router.route("/login").post(userController.loginUser);


export default router;