import express, {Request, Response, NextFunction} from "express"
import cookieParser from "cookie-parser"
import cors  from "cors";
import {config} from "dotenv"
import appRouter from "./routes/index.js"

config()

const app = express() 

//middlewares
app.use(express.json()) 
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true
}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ==== ${req.originalUrl}`) 
  next()
})

app.use("/api/v1", appRouter)


export default app