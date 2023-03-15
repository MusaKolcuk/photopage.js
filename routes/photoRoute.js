import express from "express";
import * as photoController from "../controllers/photoController.js"

const router = express.Router();

router.route("/").post(photoController.createPhoto);
router.route("/").get(photoController.getAllPhotos);


export default router;