import express from "express";
import * as pageController from "../controllers/pageController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/").get(authMiddleware.authenticateToken ,pageController.getIndexPage); //getIndexPage e gelmeden once authMiddleware ile yetkisini kontrol et yetki kontrolunu authenticateToken ile yaptik
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);



export default router;