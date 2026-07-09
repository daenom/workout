import * as React from "react"
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Activity, Blocks, Calendar, CommandIcon, LayoutDashboard, MessageCircleQuestion, NotebookPen, Settings2, Trash2 } from "lucide-react"
import { NavSecondary } from "./nav-secondary";
import { NavPrimary } from "./nav-primary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const navPrimary = [
    {title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, isActive: location.pathname === "/dashboard"},
    {title: "Exercises", url: "/exercises", icon: Activity, isActive: location.pathname.startsWith("/exercises")},
    {title: "Workout Plans", url: "/workout-plans", icon: NotebookPen, isActive: location.pathname.startsWith("/workout-plans")},
  ]

  const navSecondary = [
    { title: "Calendar", url: "/calendar", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings2 },
    { title: "Templates", url: "/templates", icon: Blocks },
    { title: "Trash", url: "/trash", icon: Trash2 },
    { title: "Help", url: "/help", icon: MessageCircleQuestion },
  ]
  return (
    <Sidebar {...props}>

      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <Link to="/">
                  <CommandIcon className="size-5!"/>
                  <span className="text-base font-semibold">Workout Inc.</span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
              <NavPrimary items={navPrimary} />
        </SidebarGroup>

        {/* <SidebarGroup>
                    <SidebarGroupLabel>
                      My Plans
                    </SidebarGroupLabel>
        </SidebarGroup >

        <SidebarGroup>
                    <SidebarGroupLabel>
                      Shared Plans
                    </SidebarGroupLabel>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  )
}