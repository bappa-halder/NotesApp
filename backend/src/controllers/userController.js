import dotenv from "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import { verificationEmail } from "../email/verificationEmail.js";
import sessionSchema from "../models/sessionSchema.js";

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const existing = await userSchema.findOne({
            email: email
        })
        if (existing) {
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userSchema.create({
            userName, email, password: hashedPassword
        })
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.VERIFY_SECRET,
            {
                expiresIn: "5m"
            }
        )
        await verificationEmail(token, email, userName)
        user.token = token
        await user.save()

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userSchema.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unathorized access"
            })
        }
        else {
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (!passwordCheck) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect password"
                })
            }
            else if (passwordCheck && user.verified === true) {
                const accessToken = jwt.sign(
                    {
                        id: user.id
                    },
                    process.env.ACCESS_SECRET,
                    {
                        expiresIn: "10m"
                    }
                )
                const refreshToken = jwt.sign(
                    {
                        id: user.id
                    },
                    process.env.REFRESH_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )
                await sessionSchema.create({
                    userId: user._id,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                })
                user.loggedIn = true
                await user.save()

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                })

                return res.status(200).json({
                    success: true,
                    message: "User logged in successfully",
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    data: user
                })
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: "Complete email verification then login"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const regenerateAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token missing"
            })
        }
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        )
        const session = await sessionSchema.findOne({
            refreshToken
        })

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Seession expired"
            })
        }
        const newAccessToken = jwt.sign(
            {
                id: decoded.id
            },
            process.env.ACCESS_SECRET,
            {
                expiresIn: "10m"
            }
        )
        session.accessToken = newAccessToken
        await session.save()

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userLogout = async (req, res) => {
    try {
        const session = await sessionSchema.findOneAndDelete({
            userId: req.userId,
            accessToken: req.accessToken
        })
        if (session) {
            await userSchema.findByIdAndUpdate(req.userId, {
                loggedIn: false
            })
            res.clearCookie("refreshToken");
            return res.status(200).json({
                success: true,
                message: "Session ended"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}