import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./app/App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner.tsx"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
           <Toaster richColors position="top-center" />
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
