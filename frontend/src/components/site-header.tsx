import { useLocation } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavActions } from "./nav-actions"

// 1. Import your new configuration file
// (Adjust the import path based on where you saved it)
import { APP_ROUTES } from "@/config/navigation" 

export function SiteHeader() {
  const location = useLocation()
  
  // Extract the base path (e.g., "/exercises/123" -> "/exercises")
  const basePath = `/${location.pathname.split('/')[1]}`
  
  // 2. Search the centralized array for the matching route
  const currentRoute = APP_ROUTES.find(route => route.path === basePath)
  
  // 3. Determine the title
  // If a route is found, use its title. 
  // If the path is exactly "/", default to Dashboard.
  // Otherwise, fallback to a generic title.
  const title = currentRoute?.title || (location.pathname === "/" ? "Dashboard" : "Acme Inc.")

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Render the dynamic title here */}
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      <div className="flex items-center gap-2 pr-1">
         <NavActions />
      </div>
    </header>
  )
}