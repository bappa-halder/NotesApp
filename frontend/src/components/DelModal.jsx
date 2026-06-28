import React from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const DelModal = ({ setShowDelModal, item, fetchNote }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await api.delete(`/note/delete/${item._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message)
            setShowDelModal(false)
            await fetchNote()
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-3">
                        <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                />
                            </svg>
                        </div>

                        <div className="text-left">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Delete Note?
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                This action cannot be undone. Are you sure you want to delete this
                                note?
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowDelModal(false)}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 active:scale-95"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DelModal