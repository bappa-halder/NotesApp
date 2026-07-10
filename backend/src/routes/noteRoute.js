import express from "express";
import { addNote, deleteNote, editNote, getAllNote } from "../controllers/noteController.js";
import { hasToken } from "../middlewares/hasToken.js";

const noteRoute = express.Router()

noteRoute.post("/add", hasToken, addNote)
noteRoute.get("/allNote", getAllNote)
noteRoute.put("/update/:id", hasToken, editNote)
noteRoute.delete("/delete/:id", hasToken, deleteNote)
export default noteRoute