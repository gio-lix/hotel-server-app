import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()
app.use(cors())
dotenv.config()

import authRouter from "./routers/auth.js"
import userRouter from "./routers/users.js"
import hotelRouter from "./routers/hotels.js"
import roomsRouter from "./routers/rooms.js"

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        throw error
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})

app.use(cookieParser())
app.use(express.json())


app.use("/api/rooms", roomsRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/hotels", hotelRouter)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(8888, () => {
    connect()
    console.log("Connected to backend")
})