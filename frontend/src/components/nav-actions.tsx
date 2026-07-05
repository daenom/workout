import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Settings2Icon, FileTextIcon, LinkIcon, CopyIcon, CornerUpRightIcon, Trash2Icon, CornerUpLeftIcon, ChartLineIcon, GalleryVerticalEndIcon, TrashIcon, BellIcon, ArrowUpIcon, ArrowDownIcon, StarIcon, MoreHorizontalIcon } from "lucide-react"
import { NavUser } from "./nav-user"

const data = [
  [
    {
      label: "Customize Page",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      label: "Turn into wiki",
      icon: (
        <FileTextIcon
        />
      ),
    },
  ],
  [
    {
      label: "Copy Link",
      icon: (
        <LinkIcon
        />
      ),
    },
    {
      label: "Duplicate",
      icon: (
        <CopyIcon
        />
      ),
    },
    {
      label: "Move to",
      icon: (
        <CornerUpRightIcon
        />
      ),
    },
    {
      label: "Move to Trash",
      icon: (
        <Trash2Icon
        />
      ),
    },
  ],
  [
    {
      label: "Undo",
      icon: (
        <CornerUpLeftIcon
        />
      ),
    },
    {
      label: "View analytics",
      icon: (
        <ChartLineIcon
        />
      ),
    },
    {
      label: "Version History",
      icon: (
        <GalleryVerticalEndIcon
        />
      ),
    },
    {
      label: "Show delete pages",
      icon: (
        <TrashIcon
        />
      ),
    },
    {
      label: "Notifications",
      icon: (
        <BellIcon
        />
      ),
    },
  ],
  [
    {
      label: "Import",
      icon: (
        <ArrowUpIcon
        />
      ),
    },
    {
      label: "Export",
      icon: (
        <ArrowDownIcon
        />
      ),
    },
  ],
]

const user = {
  name: "Cameron Norrie",
  email: "cameron@example.com",
  avatar: "/avatars/cameron.jpg",
}

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">  
      <NavUser user={user} />  
    </div>
  )
}
