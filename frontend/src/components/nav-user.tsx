import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    useSidebar,
} from "@/components/ui/sidebar"
import { CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react"
import { Button } from "./ui/button"

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg">
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            </Button>} />
            <DropdownMenuContent className="min-w-56 rounded-lg"
                side="bottom"
                align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />


                <DropdownMenuItem>

                    <UserIcon />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <SettingsIcon />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                    <LogOutIcon />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
