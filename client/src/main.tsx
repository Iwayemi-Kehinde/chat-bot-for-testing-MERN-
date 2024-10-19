import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import axios from "axios"
import {Toaster}  from "react-hot-toast"
axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true

const theme = createTheme({ typography: { fontFamily: "ysebeau office", allVariants: { color: "white" } } })
createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Toaster position="top-right"/>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </AuthProvider>
)
