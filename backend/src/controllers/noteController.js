import noteSchema from "../models/noteSchema.js"

export const addNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const existing = await noteSchema.findOne({
            title,
            userId: req.userId
        })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Title already exist"
            })
        }
        const data = await noteSchema.create({
            title, description, userId: req.userId
        })
        if (!data) {
            return res.status(401).json({
                success: false,
                message: "Note not created"
            })
        }
        return res.status(201).json({
            success: true,
            message: "Note added succesfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getAllNote = async (req, res) => {
    try {
        const data = await noteSchema.find({
            userId: req.userId
        })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Note fetch successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const editNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const noteId = req.params.id

        const data = await noteSchema.findOne({
            userId: req.userId,
            _id: noteId
        })
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        const existing = await noteSchema.findOne({
            title, 
            userId: req.userId,
            _id: {$ne: noteId}
        })
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Title already exist",
            })
        }
        data.title = title
        data.description = description
        data.updatedAt = Date.now()
        
        await data.save()

        return res.status(200).json({
            success: true,
            message: "Noted updated successfully",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id
        const data = await noteSchema.findByIdAndDelete({
            userId: req.userId,
            _id: noteId
        })
        if (data) {
            return res.status(200).json({
                success: true,
                message: "Note deleted successfully",
                data
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}