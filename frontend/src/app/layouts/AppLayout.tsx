import React from "react"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { SidebarRight } from "@/components/sidebar-right"

export default function AppLayout() {
    return (
        <SidebarProvider
            className="h-screen w-full overflow-hidden" 
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            
            {/* flex-1 absorbs space perfectly with margins. min-h-0 prevents flex-stretching */}
            <SidebarInset className="flex flex-1 flex-col overflow-hidden min-h-0">
                
                {/* shrink-0 ensures the header is NEVER squished */}
                <div className="shrink-0">
                    <SiteHeader />
                </div>
                
                {/* Chain flex-1 and min-h-0 all the way down */}
                <main className="flex flex-1 flex-col overflow-hidden min-h-0">
                    <div className="@container/main flex flex-1 flex-col gap-2 overflow-hidden min-h-0">
                        <div className="flex flex-1 flex-col gap-4 px-2 py-2 sm:py-4 overflow-hidden min-h-0">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </SidebarInset>
            
            <SidebarRight />
        </SidebarProvider>
    )
}