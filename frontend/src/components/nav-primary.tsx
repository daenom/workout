import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function NavPrimary({ items, ...props }: { items: { title: string; url: string; icon: React.ComponentType; isActive: boolean }[] } & React.ComponentProps<typeof SidebarMenu>) {
    return (
        <SidebarMenu {...props} className="space-y-1">
            {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton isActive={item.isActive} render={<Link to={item.url}>{<item.icon />}<span>{item.title}</span></Link>} />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}