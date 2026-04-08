import cookieParser from 'cookie-parser'
import cors from "cors"
import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db.js'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

dotenv.config()

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://assistant-8xz7.vercel.app"
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

// ✅ Handle preflight
app.options("*", cors())

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.listen(port, () => {
  connectDb()
  console.log("Server started on port", port)
})