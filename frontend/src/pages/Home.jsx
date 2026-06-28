import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import Note from "../components/Note";

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("userName")
    const handleLogout = async () => {
        try {
            const response = await api.delete("/user/logout",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message)
            localStorage.clear()
            navigate("/auth/login")
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 py-10">

                    {/* Header */}
                    <div className="text-center mb-10">
                        {token && user && (
                            <p className="text-sm text-gray-500 mb-2">
                                Welcome back, <span className="font-semibold text-gray-900">{user}</span> 👋
                            </p>
                        )}
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                            Notes App
                        </h1>

                        <p className="mt-3 text-lg text-gray-500">
                            Capture ideas. Organize thoughts. Stay productive.
                        </p>
                    </div>

                    {/* Auth Section */}
                    <div className="flex justify-center mb-8">
                        {token ? (
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition"
                            >
                                Login to Continue
                            </Link>
                        )}
                    </div>

                    {/* Main App Area */}
                    {token ? (
                        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6">
                            <Note />
                        </div>
                    ) : (
                        <div className="text-center mt-10">
                            <div className="mx-auto max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Welcome to Notes App
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Please login to create, edit, and manage your notes.
                                </p>

                                <Link
                                    to="/auth/login"
                                    className="mt-5 inline-block rounded-xl bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default Home