import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isLogin = location.pathname === "/auth/login"
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const handleRegister = async (data) => {
        try {
            setLoading(true)
            const response = await api.post("/user/register", data)
            toast.success("Registration successful. Please check your email to verify your account.")
            reset()
            navigate("/auth/login")
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration failed"
            )
        } finally {
            setLoading(false)
        }
    }
    const handleLogin = async (data) => {
        try {
            setLoading(true)
            const response = await api.post("/user/login", data)
            localStorage.setItem("token", response.data.accessToken)
            localStorage.setItem("userName", response.data.data.userName)
            localStorage.setItem("email", response.data.data.email)
            toast.success(response.data.message)
            reset()
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>

            <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
                <div className="w-full max-w-md">

                    {/* Card */}
                    <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-8">

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {isLogin
                                    ? "Login to continue managing your notes"
                                    : "Register to start organizing your thoughts"}
                            </p>
                        </div>

                        {/* FORM */}
                        {isLogin ? (
                            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 active:scale-[0.98] transition"
                                >
                                    Login
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">

                                {/* Username */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                        {...register("userName", { required: "User name is required" })}
                                    />
                                    {errors.userName && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.userName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                        {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 active:scale-[0.98] transition disabled:opacity-60"
                                >
                                    {loading ? "Processing..." : "Create Account"}
                                </button>
                            </form>
                        )}

                        {/* Footer Links */}
                        <div className="mt-6 text-center space-y-2 text-sm text-gray-600">
                            {isLogin ? (
                                <p>
                                    Don’t have an account?{" "}
                                    <Link className="text-indigo-600 hover:underline" to="/auth/register">
                                        Register
                                    </Link>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{" "}
                                    <Link className="text-indigo-600 hover:underline" to="/auth/login">
                                        Login
                                    </Link>
                                </p>
                            )}

                            <Link className="text-gray-400 hover:text-gray-600" to="/">
                                ← Back to Home
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Auth