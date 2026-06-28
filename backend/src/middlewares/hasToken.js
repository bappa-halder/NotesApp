import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";

export const hasToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token missing or invalid"
            })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        const user = await userSchema.findById(decoded.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const session = await sessionSchema.findOne({
            userId: decoded.id,
            accessToken: token
        })
        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Session expired or user logged out"
            })
        }
        req.userId = decoded.id
        req.accessToken = token
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Access token expired"
            })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}