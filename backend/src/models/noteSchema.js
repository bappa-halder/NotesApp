import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notesUser",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.model("notes", noteSchema)