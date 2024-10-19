import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";

type User = {
   name: string,
   email: string 
}
type UserAuth = {
   isLoggedIn: boolean
   user: User | null 
   login: (email: string, password: string) => Promise<void>
   signup: (name: string, email: string, password: string) => Promise<void>
   logout: () => Promise<void>
}

const AuthContext = createContext<UserAuth | null>(null)

export const AuthProvider = ({children} : {children: ReactNode}) => {
   const [user, setUser] = useState<User | null>(null)
   const [isLoggedIn, setIsloggedIn] = useState(false)

 

   useEffect(() => {
      async function checkStatus() {
         const data = await checkAuthStatus()
         if(data) {
            setUser({email: data.email, name: data.name})
            setIsloggedIn(true)
         }
      }

      checkStatus()
      //fetch if the cookies are valid, then skip login.
   }, [])

   const login = async (email: string, password: string) => {
      const data = await loginUser(email, password) 
      if(data) {
         setUser({email: data.email, name: data.name})
         setIsloggedIn(true)
      }
   }

   const signup = async (email: string, password: string, name: string) => {
      
   }

   const logout = async () => {

   }

   const value = {
      user,
      isLoggedIn,
      login, 
      logout,
      signup
   } 

   return (
      <AuthContext.Provider value={value}>
         {children}
      </AuthContext.Provider>
   )

}

export const useAuth = () => useContext(AuthContext)