import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token is missing or invalid"
            })
        }
        else {
            const token = authHeader.split(" ")[1]
            jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
                if (err) {
                    if (err.name === "TokenExpiredEnd") {
                        return res.status(400).json({
                            success: false,
                            message: "Token expired"
                        })
                    }
                    return res.status(400).json({
                        success: false,
                        message: "Email verification failed"
                    })
                }
                else {
                    const { id } = decoded
                    const user = await userSchema.findById(id)
                    if (!user) {
                        return res.status(404).json({
                            success: false,
                            message: "User not found"
                        })
                    }
                    else {
                        user.token = null
                        user.verified = true
                        await user.save()
                        return res.status(200).json({
                            success: true,
                            message: "Email verified successfully"
                        })
                    }
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}