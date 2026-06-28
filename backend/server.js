import express from "express";
import dotenv from "dotenv/config";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/routes/userRoute.js";
import noteRoute from "./src/routes/noteRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.PORT

dbConnect()

app.use(express.json())
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use("/user", userRoute)
app.use("/note", noteRoute)

app.listen(port, () => {
    console.log(`server running at ${port}`);
})