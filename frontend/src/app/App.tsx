import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "../components/ui/tooltip"
import ExerciseList from "@/features/exercise/components/ExerciseList"
import Page from "@/features/exercise/pages/temp"
import DocumentsPage from "@/features/exercise/pages/documents"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="exercises" element={<ExerciseList />} />
            <Route path="documents" element={<DocumentsPage />} />
          </Route>
          <Route path="/test" element={<ExerciseList />} />
          <Route path="/temp" element={<Page />} />
          <Route path="*" element={<Navigate to="/documents" replace />} />
        </Routes>
      </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
