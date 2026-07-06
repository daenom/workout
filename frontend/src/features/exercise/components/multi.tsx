import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { X } from "lucide-react"

interface MultiSelectProps {
  title: string
  options: string[]
  value: string[]
  onValueChange: (value: string[]) => void
  icon?: React.ReactNode
  className?: string
}

export function MultiSelect({
  title,
  options,
  value,
  onValueChange,
  icon,
  className
}: MultiSelectProps) {
  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange(value.filter((v) => v !== optionValue))
    } else {
      onValueChange([...value, optionValue])
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation() 
    onValueChange([])   
  }

  const selectedOptions = options.filter(opt => value.includes(opt))
  const unselectedOptions = options.filter(opt => !value.includes(opt))

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn("flex items-center gap-2", className)}
        >
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <span className="font-medium">{title}</span>
          
          {value.length > 0 && (
  <>
    <div className="hidden md:block h-4 w-[1px] bg-border mx-1" />

    <div className="hidden md:flex items-center gap-1 text-sm">
      <span>{value.length} selected</span>
      <button
        type="button"
        className="hover:bg-muted rounded-full p-0.5 transition-colors"
        onClick={handleClear}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={`Clear ${title} selection`}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  </>
)}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-[200px]">
        {selectedOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value.includes(option)}
            onCheckedChange={() => handleSelect(option)}
            onSelect={(e) => e.preventDefault()}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}

        {selectedOptions.length > 0 && unselectedOptions.length > 0 && (
          <DropdownMenuSeparator />
        )}

        {unselectedOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value.includes(option)}
            onCheckedChange={() => handleSelect(option)}
            onSelect={(e) => e.preventDefault()}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}