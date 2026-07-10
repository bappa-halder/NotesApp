import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
})

export const verificationEmail = async (token, email, userName) => {
    try {
        const verificationLink = `https://notes-app-pearl-three.vercel.app/verify/${token}`
        const emailConfig = {
            from: `"Notes App" <${process.env.EMAIL}>`,
            to: email,
            subject: "Verify your email",
            html: `<div style="
                    max-width:600px;
                    margin:auto;
                    padding:40px 20px;
                    font-family:Arial,sans-serif;
                    background:#f4f7fb;
                ">

                    <div style="
                        background:white;
                        padding:40px 30px;
                        border-radius:12px;
                        text-align:center;
                        box-shadow:0 2px 10px rgba(0,0,0,0.08);
                    ">

                        <h1 style="
                            color:#111827;
                            margin-bottom:10px;
                        ">
                            Verify Your Email
                        </h1>

                        <p style="
                            color:#4b5563;
                            font-size:16px;
                            line-height:1.6;
                        ">
                            Hello ${userName},
                        </p>

                        <p style="
                            color:#4b5563;
                            font-size:16px;
                            line-height:1.6;
                        ">
                            Thank you for registering.
                            Please verify your email address
                            by clicking the button below.
                        </p>

                        <a
                            href="${verificationLink}"
                            style="
                                display:inline-block;
                                margin-top:20px;
                                padding:14px 28px;
                                background:#2563eb;
                                color:white;
                                text-decoration:none;
                                border-radius:8px;
                                font-size:16px;
                                font-weight:600;
                            "
                        >
                            Verify Email
                        </a>

                        <p style="
                            margin-top:30px;
                            color:#6b7280;
                            font-size:14px;
                            word-break:break-all;
                        ">
                            ${verificationLink}
                        </p>

                        <p style="
                            margin-top:20px;
                            color:#9ca3af;
                            font-size:14px;
                        ">
                            This link will expire in 15 minutes.
                        </p>

                    </div>

                </div>`
        }
        await transporter.sendMail(emailConfig)
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
}