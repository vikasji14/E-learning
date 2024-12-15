import express from "express";
import { login, register, logout, getUserProfile,updateProfile,bioChange } from "../controllers/user.controller.js";
import {isAuth} from "../middlewares/isAuth.js";
import upload from "../utils/multer.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",logout);
router.get('/profile',isAuth,getUserProfile)
router.put('/profile/update',isAuth,upload.single("profilePhoto"),updateProfile)
router.post('/profile/bio',isAuth,bioChange)

export default router;  