"use client"

import { useCallback, useState } from "react"
import {
  createFilter,
  Filters,
  type Filter,
  type FilterFieldConfig,
} from "@/components/reui/filters"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { StarIcon, TagIcon, MailIcon, GlobeIcon, UserIcon, UserRoundXIcon, CircleAlertIcon, ListFilterIcon, FunnelXIcon } from "lucide-react"

// Priority icon component
const PriorityIcon = ({ priority }: { priority: string }) => {
  const colors = {
    low: "text-green-500",
    medium: "text-yellow-500",
    high: "text-orange-500",
    urgent: "text-red-500",
  }
  return (
    <StarIcon className={colors[priority as keyof typeof colors]} />
  )
}

export function Pattern() {
  // Basic filter fields for outline variant demo
  const fields: FilterFieldConfig[] = [
    {
      key: "text",
      label: "Text",
      icon: (
        <TagIcon className="size-3.5" />
      ),
      type: "text",
      className: "w-36",
      placeholder: "Search text...",
    },
    {
      key: "email",
      label: "Email",
      icon: (
        <MailIcon className="size-3.5" />
      ),
      type: "text",
      className: "w-40",
      placeholder: "user@example.com",
    },
    {
      key: "website",
      label: "Website",
      icon: (
        <GlobeIcon className="size-3.5" />
      ),
      type: "text",
      className: "w-40",
      placeholder: "https://example.com",
    },
    {
      key: "assignee",
      label: "Assignee",
      icon: (
        <UserIcon className="size-3.5" />
      ),
      type: "multiselect",
      className: "w-[200px]",
      options: [
        {
          value: "john",
          label: "John Doe",
          icon: (
            <Avatar className="size-5">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: "jane",
          label: "Jane Smith",
          icon: (
            <Avatar className="size-5">
              <AvatarImage
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="Jane Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: "bob",
          label: "Bob Johnson",
          icon: (
            <Avatar className="size-5">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="Bob Johnson"
              />
              <AvatarFallback>BJ</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: "alice",
          label: "Alice Brown",
          icon: (
            <Avatar className="size-5">
              <AvatarImage
                src="https://randomuser.me/api/portraits/women/4.jpg"
                alt="Alice Brown"
              />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: "nick",
          label: "Nick Bold",
          icon: (
            <Avatar className="size-5">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="Nick Bold"
              />
              <AvatarFallback>NB</AvatarFallback>
            </Avatar>
          ),
        },
        {
          value: "unassigned",
          label: "Unassigned",
          icon: (
            <Avatar className="size-5">
              <AvatarFallback>
                <UserRoundXIcon
                />
              </AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      icon: (
        <CircleAlertIcon className="size-3.5" />
      ),
      type: "multiselect",
      className: "w-[180px]",
      options: [
        { value: "low", label: "Low", icon: <PriorityIcon priority="low" /> },
        {
          value: "medium",
          label: "Medium",
          icon: <PriorityIcon priority="medium" />,
        },
        {
          value: "high",
          label: "High",
          icon: <PriorityIcon priority="high" />,
        },
        {
          value: "urgent",
          label: "Urgent",
          icon: <PriorityIcon priority="urgent" />,
        },
      ],
    },
  ]

  const [filters, setFilters] = useState<Filter[]>([
    createFilter("assignee", "is_any_of", ["john", "nick", "alice"]),
  ])

  const handleFiltersChange = useCallback((filters: Filter[]) => {
    setFilters(filters)
  }, [])

  return (
    <div className="flex grow content-start items-start gap-2.5 self-start">
      <div className="flex-1">
        <Filters
          filters={filters}
          fields={fields}
          trigger={
            <Button variant="outline" size="icon">
              <ListFilterIcon
              />
            </Button>
          }
          onChange={handleFiltersChange}
        />
      </div>

      {filters.length > 0 && (
        <Button variant="outline" onClick={() => setFilters([])}>
          <FunnelXIcon
          />
          Clear
        </Button>
      )}
    </div>
  )
}