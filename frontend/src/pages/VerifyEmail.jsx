import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";

const Verify = () => {
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const params = useParams()
    const verifyToken = params.token

    const verification = async () => {
        try {
            const response = await api.get("/user/verify",
                {
                    headers: {
                        Authorization: `Bearer ${verifyToken}`
                    }
                }
            )
            setMessage(response.data.message)
            setTimeout(() => navigate("/auth/login"), 3000)
        } catch (error) {
            setMessage(error.response?.data?.message)
        }
    }
    useEffect(() => {
        verification()
    }, [])
    return (
        <>
            <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">

                <div className="w-full max-w-md rounded-2xl bg-white border border-gray-100 shadow-lg p-8 text-center">

                    {/* Icon */}
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
                        <svg
                            className="h-7 w-7 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-semibold text-gray-900">
                        Verification Status
                    </h1>

                    {/* Message */}
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                        {message}
                    </p>

                    {/* Optional loader or action */}
                    <div className="mt-6">
                        <Link
                            to="/auth/login"
                            className="inline-block rounded-xl bg-indigo-600 px-6 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition"
                        >
                            Go to Login
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Verify