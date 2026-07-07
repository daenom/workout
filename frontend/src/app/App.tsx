import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "../components/ui/tooltip"
import ExerciseList from "@/features/exercise/components/ExerciseList"
import Page from "@/features/exercise/pages/temp"
import DocumentsPage from "@/features/exercise/pages/documents"
import ExercisesPage from "@/features/exercise/pages/exercise-page"
import { AddExerciseForm } from "@/features/exercise/components/AddExercise"
import MyCustomPage from "@/features/exercise/pages/temp"
import { ExerciseSkeletonCard } from "@/features/exercise/components/ExerciseSkeletonCard"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="exercises" element={<ExercisesPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            
          </Route>
          <Route path="/test" element={<AddExerciseForm />} />
          <Route path="/temp" element={<ExerciseSkeletonCard />} />
          <Route path="*" element={<Navigate to="/documents" replace />} />
        </Routes>
      </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
