import { Route, Routes } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import { ExercisesPage } from "@/features/exercise/pages/exercises-page"
import AuthLayout from "./layouts/auth-layout"
import SignupPage from "@/features/auth/pages/signup-page"
import LoginPage from "@/features/auth/pages/login-page"
import AuthInitializer from "@/features/auth/components/auth-initializer"

export function App() {
  return (
    <Routes>
      <Route element={<AuthInitializer />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/workout-plans" element={<div>Workout Plans</div>} />
          <Route path="/*" element={<div>404 Not Found</div>} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
