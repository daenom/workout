import { Link, useLocation } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import React from "react";
import { NavUser } from "./nav-user";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "./ui/button";

export function SiteHeader() {
    const { pathname } = useLocation();
    const user = useAuthStore((state) => state.user);

    const segments = pathname.split("/").filter(Boolean);

    return (
        <header className="flex h-12 items-center border-b pl-3 pr-2">
            <SidebarTrigger className="mr-2" />
            <Separator orientation="vertical" className="mr-4 h-auto my-3" />

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            render={<Link to="/" />}
                        >
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments.map((segment, index) => {
                        const href = "/" + segments.slice(0, index + 1).join("/");
                        const isLast = index === segments.length - 1;

                        const label =
                            segment
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, c => c.toUpperCase());

                        return (
                            <React.Fragment key={href}>
                                <BreadcrumbSeparator />

                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{label}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink render={<Link to={href} />}>
                                            {label}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2" >
                {user ? (<NavUser />) : 
                    <>
                        <Button className="rounded-full">
                            <Link to="/login">Login</Link>
                        </Button>
                        <div className="hidden sm:block">
                        <Button variant="outline" className="rounded-full">
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                        </div>
                    </>
                }
            </div>
        </header>
    );
}