import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"


export const getAllUsers = async (req:Request, res: Response, next:NextFunction): Promise<any> => {
	try {
		const users = await User.find()
		return res.status(200).json({users})
	} catch (error: any) {
		return res.status(500).json({error: error.message})
	}
}