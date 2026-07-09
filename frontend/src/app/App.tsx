import { Route, Routes } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import { ExercisesPage } from "@/features/exercise/pages/exercises-page"

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/exercises" element={<ExercisesPage/>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/workout-plans" element={<div>Workout Plans</div>} />
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App
