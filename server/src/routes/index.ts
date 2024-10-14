import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router()

appRouter.use("/user", userRoutes) // /api/vi/user
appRouter.use("/chats", chatRoutes) // /api/vi/chats

export default appRouter