import React, { useEffect, useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import DelModal from "./DelModal";

const Note = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState([])
    const [openMenu, setOpenMenu] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDelModal, setShowDelModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const [expanded, setExpanded] = useState(false)
    const [expandedId, setExpandedId] = useState(null);

    const fetchNote = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await api.get("/note/allNote",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setNotes(response.data.data)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    const handleAdd = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await api.post("/note/add",
                {
                    title,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTitle("")
            setDescription("")
            fetchNote()
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchNote()
    }, []);
    return (
        <>

            <div className="max-w-md mx-auto mt-6">
                <div className="border border-yellow-400 rounded-xl bg-white shadow-sm p-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onFocus={() => setExpanded(true)}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-yellow-300 rounded-lg px-4 py-2 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    />

                    {expanded && (
                        <div className="mt-4 space-y-4 animate-in fade-in duration-2000">
                            <textarea
                                rows={4}
                                placeholder="Description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-yellow-300 rounded-lg px-4 py-2 resize-none outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setExpanded(false)}
                                    className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleAdd}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {notes.length === 0 ? (
                    <p className="col-span-full text-center text-gray-400"> No notes found </p>
                ) : (
                    notes.map((item) => (
                        <div
                            key={item._id}
                            className="group relative rounded-2xl bg-white shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                        >
                            {/* Menu button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenMenu(openMenu === item._id ? null : item._id)
                                }
                                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
                            >
                                <i className="fa-solid fa-ellipsis-vertical text-gray-500 hover:text-gray-800"></i>
                            </button>

                            {/* Menu */}
                            {openMenu === item._id && (
                                <div className="absolute top-10 right-3 w-36 rounded-xl border bg-white shadow-lg overflow-hidden z-10">
                                    <button
                                        onClick={() => {
                                            setOpenMenu(null);
                                            setSelectedNote(item);
                                            setShowEditModal(true);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setOpenMenu(null);
                                            setSelectedNote(item);
                                            setShowDelModal(true);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <h4 className="text-lg font-semibold text-gray-900 capitalize line-clamp-1"> {item.title} </h4>

                            <p className="mt-2 text-sm text-gray-600 capitalize">
                                {expandedId === item._id
                                    ? item.description
                                    : item.description.length > 120
                                        ? item.description.slice(0, 120) + "..."
                                        : item.description}
                            </p>
                            {item.description.length > 120 && (
                                <button
                                    onClick={() =>
                                        setExpandedId(expandedId === item._id ? null : item._id)
                                    }
                                    className="mt-2 text-xs text-indigo-600 hover:underline"
                                >
                                    {expandedId === item._id ? "Show less" : "Read more"}
                                </button>
                            )}

                            {/* Footer hint */}
                            <div className="mt-4 text-xs text-gray-400"> Click menu for actions </div>
                        </div>
                    ))
                )}
            </div>


            {
                showEditModal && <EditModal setShowEditModal={setShowEditModal} item={selectedNote} fetchNote={fetchNote} />
            }
            {
                showDelModal && <DelModal setShowDelModal={setShowDelModal} item={selectedNote} fetchNote={fetchNote} />
            }
        </>
    )
}

export default Note