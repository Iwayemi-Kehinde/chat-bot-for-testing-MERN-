import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"


export const getAllUsers = async (req:Request, res: Response, next:NextFunction): Promise<any> => {
	try {
		const users = await User.find()
		return res.status(200).json({message: "OK", user: users})
	} catch (error: any) {
		return res.status(500).json({error: error.message})
	}
}

export const userSignup = async (req:Request, res: Response, next:NextFunction): Promise<any> => {
	try { 
		const {email, password, name} = req.body;
		const hashedPassword = await bcrypt.hash(password, 50)
		const user = new User({name, email, password: hashedPassword})
		await user.save()
		return res.status(200).json({message: "OK", user: user._id.toString()})
	} catch (error: any) {
		return res.status(500).json({error: error.message})
	}
} 