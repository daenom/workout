import * as React from "react"
import { useLocation, Link } from "react-router-dom" // Added useLocation and Link

import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CommandIcon, MessageCircleQuestion, Trash2, AudioWaveform, Home, Inbox, Calendar, Settings2, Blocks } from "lucide-react"

import { NavMain } from "./nav-main"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get the current location from react-router
  const location = useLocation()

  // Move data inside the component to compute isActive dynamically
  const navMain = [
    {
      title: "Dashboard",
      url: "/documents", // Assuming /documents is your default dashboard view based on your router fallback
      icon: Home,
      isActive: location.pathname === "/documents" || location.pathname === "/",
    },
    {
      title: "Exercises",
      url: "/exercises", // Maps to the path in your router
      icon: Inbox,
      badge: "10",
      isActive: location.pathname.startsWith("/exercises"),
    },
    {
      title: "Workout Plans",
      url: "/workout-plans", 
      icon: AudioWaveform,
      isActive: location.pathname.startsWith("/workout-plans"),
    }
  ]

  const navSecondary = [
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings2 },
    { title: "Templates", url: "/templates", icon: Blocks },
    { title: "Trash", url: "/trash", icon: Trash2 },
    { title: "Help", url: "/help", icon: MessageCircleQuestion },
  ]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! "
            >
              {/* Switched standard <a> tag to react-router <Link> */}
              <Link to="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* Pass the dynamically calculated items */}
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}