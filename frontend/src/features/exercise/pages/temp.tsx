import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getExercises } from "../api/exerciseApi";
import { Button } from "@base-ui/react";

export default async function Page() {
  const data = await getExercises();

  console.log(data);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-1 flex-col gap-4 px-4 py-10">
              <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" >
              <Button className="w-full max-w-3xl">
                Click Me
              </Button>
              </div>
              <div className="mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50" />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
