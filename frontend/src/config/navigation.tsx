// src/config/navigation.ts
import { Home, Inbox, AudioWaveform } from "lucide-react"

export const APP_ROUTES = [
  {
    path: "/documents",
    title: "Dashboard",
    icon: Home,
    showInSidebar: true,
  },
  {
    path: "/exercises",
    title: "Exercises",
    icon: Inbox,
    showInSidebar: true,
    badge: "10",
  },
  {
    path: "/workout-plans",
    title: "Workout Plans",
    icon: AudioWaveform,
    showInSidebar: true,
  }
]