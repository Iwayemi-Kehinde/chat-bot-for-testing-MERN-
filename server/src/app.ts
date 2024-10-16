import express, {Request, Response, NextFunction} from "express"
import cookieParser from "cookie-parser"
import {config} from "dotenv"
import appRouter from "./routes/index.js"

config()

const app = express() 

//middlewares
app.use(express.json()) 
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ==== ${req.originalUrl}`) 
  next()
})

app.use("/api/v1", appRouter)


export default app