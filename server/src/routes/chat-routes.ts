import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator } from "../utils/validators.js";

const chatRoutes = Router()

chatRoutes.post("/new", chatCompletionValidator, verifyToken)

export default chatRoutes