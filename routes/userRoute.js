import express from "express";
import * as userController from "../controllers/userController.js"
import * as authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.route("/register").post(userController.createUser);      // Register a tiklayinca kayit islemi gerceklesir.
router.route("/login").post(userController.loginUser);
router.route("/dashboard").get(authMiddleware.authenticateToken ,userController.getDashboardPage);
router.route("/").get(authMiddleware.authenticateToken, userController.getAllUsers); //giris yapmadan once photo lara bakanlar kullanici ismine tikladiginda login olmadiklari icin photo atan kullanicinin hesabini goruntuleyemez.
router.route("/:id").get(authMiddleware.authenticateToken, userController.getAUser); // tekil user sayfasi icin :id parametresi gelir.
router.route("/:id/follow").put(authMiddleware.authenticateToken, userController.follow);   // takip islemleri
router.route("/:id/unfollow").put(authMiddleware.authenticateToken ,userController.unfollow);



export default router;