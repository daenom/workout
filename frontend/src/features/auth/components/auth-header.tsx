import { GalleryVerticalEnd } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AuthHeader() {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <NavLink to="/">
                <div className="flex size-8 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Workout Inc.</span>
            </NavLink>
            <h1 className="text-xl font-bold">Welcome to Workout Inc.</h1>
        </div>
    )
}