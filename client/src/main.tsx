import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"

const theme = createTheme({ typography: { fontFamily: "ysebeau office", allVariants: { color: "white" } } })
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
)
