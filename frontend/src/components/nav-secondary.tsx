import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function NavSecondary({ items, ...props }: { items: { title: string; url: string; icon: React.ComponentType }[] } & React.ComponentProps<typeof SidebarMenu>) {
    return (
        <SidebarMenu {...props}>
            {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton isActive={window.location.pathname === item.url} render={<Link to={item.url}>{<item.icon />}<span>{item.title}</span></Link>} />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}