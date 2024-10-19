import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js"
import { NextFunction, Request, Response } from "express"

export const createToken = (id: string, email: string, expiresIn: string) => {
   const payload = {id, email }
   const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn})
   return token
}

export const verifyToken = async (req:Request, res: Response, next:NextFunction) => {
   const token = req.signedCookies[`${COOKIE_NAME}`]
   console.log(token)
   return new Promise<void>((resolve, reject) => {
      return jwt.verify(token, process.env.JWT_SECRET, (err:any, success:any) => {
         if(!token || token.trim() === "") {
            return res.status(401).json({message: "No token"})
         }
         if(err) {
            reject(err.message)
            return res.status(401).json({err: "Token expired"})
         } else {
            console.log("SUCCESS")
            resolve()
            res.locals.jwtData = success

            return next()
         }
      })
   })
}