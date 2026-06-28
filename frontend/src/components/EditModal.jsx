import React, { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

const EditModal = ({ setShowEditModal, item, fetchNote }) => {
    const [title, setTitle] = useState(item?.title || "")
    const [description, setDescription] = useState(item?.description || "")
    const handleEdit = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await api.put(`/note/update/${item._id}`,
                {
                    title, description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(response.data.message)
            setShowEditModal(false)
            await fetchNote()
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="border-b px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-900">Edit Note</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Update your note and save the changes.
                        </p>
                    </div>

                    {/* Body */}
                    <div className="space-y-5 p-6">
                        <div>
                            <label className="text-left mb-2 block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title..."
                                className="w-full rounded-lg border border-yellow-300 px-4 py-2 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            />
                        </div>

                        <div>
                            <label className="text-left mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={5}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write something..."
                                className="w-full resize-none rounded-lg border border-yellow-300 px-4 py-2 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t px-6 py-4">
                        <button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleEdit}
                            className="rounded-lg bg-yellow-500 px-5 py-2 font-medium text-white transition hover:bg-yellow-600 active:scale-95"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditModal