import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createToken } from "../utils/token-manager.js"
import { COOKIE_NAME } from "../utils/constants.js"


export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const users = await User.find()
		return res.status(200).json({ message: "OK", user: users })
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}

export const userSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const { email, password, name } = req.body;
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			return res.status(401).send("User already registered")
		}
		const saltRound = 10
		const hashedPassword = await bcrypt.hash(password, saltRound)
		const user = new User({ name, email, password: hashedPassword })
		await user.save()

		res.clearCookie(COOKIE_NAME, {httpOnly: true, domain: "localhost", signed: true, path: "/"})
		const token = createToken(user._id.toString(), user.email, "7d")
		const expires = new Date()
		expires.setDate(expires.getDate() + 7)
		res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true })
		return res.status(200).json({ message: "OK", email: user.email, name:user.name })
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
}


export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const { email, password } = req.body;
		const existingUser = await User.findOne({ email })
		if (!existingUser) {
			return res.status(401).send("User not registered")
		}
		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
		if (!isPasswordCorrect) {
			return res.status(403).send("Incorrect Password")
		}

		res.clearCookie(COOKIE_NAME, {httpOnly: true, domain: "localhost", signed: true, path: "/"})
		const token = createToken(existingUser._id.toString(), existingUser.email, "7d")
		const expires = new Date()
		expires.setDate(expires.getDate() + 7)
		res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true })
 
		return res.status(200).json({ message: "OK", name:existingUser.name, email:existingUser.email })
	} catch (error: any) {
		return res.status(500).json({ error: error.message })
	}
} 


