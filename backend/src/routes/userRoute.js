import express from "express";
import { regenerateAccessToken, userlogin, userLogout, userRegister } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { hasToken } from "../middlewares/hasToken.js";

const userRoute = express.Router()

userRoute.post("/register", userRegister)
userRoute.get("/verify", verifyToken)
userRoute.post("/login", userlogin)
userRoute.post("/refresh-token", regenerateAccessToken)
userRoute.delete("/logout", hasToken, userLogout)

export default userRoute