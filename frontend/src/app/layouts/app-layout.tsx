import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { ExerciseCard } from "@/features/exercise/components/exercise-card"
import { ExerciseCardSkeleton } from "@/features/exercise/components/exercise-skeleton"
import { ExercisesPage } from "@/features/exercise/pages/exercises-page"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
    return (
        <SidebarProvider
            className="h-svh overflow-hidden"
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                    //   "--sidebar-width-icon": "2rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset className="flex min-h-0 flex-col overflow-hidden">
                <SiteHeader />
                <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:[scrollbar-width:none] sm:[-ms-overflow-style:none] sm:[&::-webkit-scrollbar]:hidden">
                    <Outlet/>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}