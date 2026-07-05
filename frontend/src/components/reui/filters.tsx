import type React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AlertCircleIcon, XIcon, PlusIcon } from "lucide-react"

// i18n Configuration Interface
export interface FilterI18nConfig {
  addFilter: string
  searchFields: string
  noFieldsFound: string
  noResultsFound: string
  select: string
  true: string
  false: string
  min: string
  max: string
  to: string
  typeAndPressEnter: string
  selected: string
  selectedCount: string
  percent: string
  defaultCurrency: string
  defaultColor: string
  addFilterTitle: string

  operators: Record<string, string>
  placeholders: {
    enterField: (fieldType: string) => string
    selectField: string
    searchField: (fieldName: string) => string
    enterKey: string
    enterValue: string
  }
  helpers: {
    formatOperator: (operator: string) => string
  }
  validation: {
    invalidEmail: string
    invalidUrl: string
    invalidTel: string
    invalid: string
  }
}

// Default English i18n configuration
export const DEFAULT_I18N: FilterI18nConfig = {
  addFilter: "Filter",
  searchFields: "Filter...",
  noFieldsFound: "No filters found.",
  noResultsFound: "No results found.",
  select: "Select...",
  true: "True",
  false: "False",
  min: "Min",
  max: "Max",
  to: "to",
  typeAndPressEnter: "Type and press Enter to add tag",
  selected: "selected",
  selectedCount: "selected",
  percent: "%",
  defaultCurrency: "$",
  defaultColor: "#000000",
  addFilterTitle: "Add filter",
  operators: {
    isAnyOf: "is any of",
  },
  placeholders: {
    enterField: (fieldType: string) => `Enter ${fieldType}...`,
    selectField: "Select...",
    searchField: (fieldName: string) => `Search ${fieldName.toLowerCase()}...`,
    enterKey: "Enter key...",
    enterValue: "Enter value...",
  },
  helpers: {
    formatOperator: (operator: string) => operator.replace(/_/g, " "),
  },
  validation: {
    invalidEmail: "Invalid email format",
    invalidUrl: "Invalid URL format",
    invalidTel: "Invalid phone format",
    invalid: "Invalid input format",
  },
}

interface FilterContextValue {
  variant: "solid" | "default"
  size: "sm" | "default" | "lg"
  radius: "default" | "full"
  i18n: FilterI18nConfig
  className?: string
  showSearchInput?: boolean
  trigger?: React.ReactNode
  allowMultiple?: boolean
}

const FilterContext = createContext<FilterContextValue>({
  variant: "default",
  size: "default",
  radius: "default",
  i18n: DEFAULT_I18N,
  className: undefined,
  showSearchInput: true,
  trigger: undefined,
  allowMultiple: false, // DEFAULTED TO FALSE SO FILTERS DISAPPEAR WHEN SELECTED
})

const useFilterContext = () => useContext(FilterContext)

const filtersContainerVariants = cva("flex flex-wrap items-center", {
  variants: {
    variant: {
      solid: "gap-2",
      default: "",
    },
    size: {
      sm: "gap-1.5",
      default: "gap-2.5",
      lg: "gap-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function FilterInput<T = unknown>({
  field,
  onBlur,
  onKeyDown,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  field?: FilterFieldConfig<T>
}) {
  const context = useFilterContext()
  const [isValid, setIsValid] = useState(true)
  const [validationMessage, setValidationMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [props.autoFocus])

  const validateInput = (value: string, pattern?: string): boolean => {
    if (!pattern || !value) return true
    const regex = new RegExp(pattern)
    return regex.test(value)
  }

  const getValidationMessage = (): string => context.i18n.validation.invalid

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value
    const pattern = field?.pattern || props.pattern
    if (value && (pattern || field?.validation)) {
      let valid = true
      let customMessage = ""
      if (field?.validation) {
        const result = field.validation(value)
        if (typeof result === "boolean") {
          valid = result
        } else {
          valid = result.valid
          customMessage = result.message || ""
        }
      } else if (pattern) {
        valid = validateInput(value, pattern)
      }
      setIsValid(valid)
      setValidationMessage(valid ? "" : customMessage || getValidationMessage())
    } else {
      setIsValid(true)
      setValidationMessage("")
    }
    onBlur?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !isValid &&
      !["Tab", "Escape", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      setIsValid(true)
      setValidationMessage("")
    }
    onKeyDown?.(e)
  }

  return (
    <InputGroup
      className={cn(
        "w-36",
        context.size == "sm" && "h-7!",
        context.size == "default" && "h-8!",
        context.size == "lg" && "h-9!",
        className
      )}
    >
      {field?.prefix && (
        <InputGroupAddon>
          <InputGroupText>{field.prefix}</InputGroupText>
        </InputGroupAddon>
      )}
      <InputGroupInput
        ref={inputRef}
        aria-invalid={!isValid}
        aria-describedby={!isValid && validationMessage ? `${field?.key || "input"}-error` : undefined}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          context.size == "sm" && "h-7! text-xs",
          context.size == "default" && "h-8!",
          context.size == "lg" && "h-9!"
        )}
        {...props}
      />
      {!isValid && validationMessage && (
        <InputGroupAddon align="inline-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton size="icon-xs">
                  <AlertCircleIcon className="text-destructive size-3.5" />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{validationMessage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroupAddon>
      )}
      {field?.suffix && (
        <InputGroupAddon align="inline-end">
          <InputGroupText>{field.suffix}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}

interface FilterRemoveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

function FilterRemoveButton({ className, icon = <XIcon />, ...props }: FilterRemoveButtonProps) {
  const context = useFilterContext()
  return (
    <Button
      variant="outline"
      size={context.size === "sm" ? "icon-sm" : context.size === "lg" ? "icon-lg" : "icon"}
      className={className}
      {...props}
    >
      {icon}
    </Button>
  )
}

export interface FilterOption<T = unknown> {
  value: T
  label: string
  icon?: React.ReactNode
  metadata?: Record<string, unknown>
  className?: string
}

export interface CustomRendererProps<T = unknown> {
  field: FilterFieldConfig<T>
  values: T[]
  onChange: (values: T[]) => void
  operator: string
}

export interface FilterFieldGroup<T = unknown> {
  group?: string
  fields: FilterFieldConfig<T>[]
}

export type FilterFieldsConfig<T = unknown> = FilterFieldConfig<T>[] | FilterFieldGroup<T>[]

export interface FilterFieldConfig<T = unknown> {
  key?: string
  label?: string
  icon?: React.ReactNode
  type?: "select" | "multiselect" | "text" | "custom" | "separator"
  group?: string
  fields?: FilterFieldConfig<T>[]
  options?: FilterOption<T>[]
  customRenderer?: (props: CustomRendererProps<T>) => React.ReactNode
  customValueRenderer?: (values: T[], options: FilterOption<T>[]) => React.ReactNode
  placeholder?: string
  searchable?: boolean
  maxSelections?: number
  min?: number
  max?: number
  step?: number
  prefix?: string | React.ReactNode
  suffix?: string | React.ReactNode
  pattern?: string
  validation?: (value: unknown) => boolean | { valid: boolean; message?: string }
  allowCustomValues?: boolean
  className?: string
  menuPopupClassName?: string
  groupLabel?: string
  onLabel?: string
  offLabel?: string
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultOperator?: string
  value?: T[]
  onValueChange?: (values: T[]) => void
}

const isFieldGroup = <T = unknown,>(item: FilterFieldConfig<T> | FilterFieldGroup<T>): item is FilterFieldGroup<T> => {
  return "fields" in item && Array.isArray(item.fields)
}

const isGroupLevelField = <T = unknown,>(field: FilterFieldConfig<T>): boolean => {
  return Boolean(field.group && field.fields)
}

const flattenFields = <T = unknown,>(fields: FilterFieldsConfig<T>): FilterFieldConfig<T>[] => {
  return fields.reduce<FilterFieldConfig<T>[]>((acc, item) => {
    if (isFieldGroup(item)) return [...acc, ...item.fields]
    if (isGroupLevelField(item)) return [...acc, ...item.fields!]
    return [...acc, item]
  }, [])
}

const getFieldsMap = <T = unknown,>(fields: FilterFieldsConfig<T>): Record<string, FilterFieldConfig<T>> => {
  const flatFields = flattenFields(fields)
  return flatFields.reduce((acc, field) => {
    if (field.key) acc[field.key] = field
    return acc
  }, {} as Record<string, FilterFieldConfig<T>>)
}

// ----------------------------------------------------------------------
// SELECT OPTIONS POPOVER - SEARCH BAR REMOVED
// ----------------------------------------------------------------------
interface SelectOptionsPopoverProps<T = unknown> {
  field: FilterFieldConfig<T>
  values: T[]
  onChange: (values: T[]) => void
  onClose?: () => void
  inline?: boolean
}

function SelectOptionsPopover<T = unknown>({
  field,
  values,
  onChange,
  onClose,
  inline = false,
}: SelectOptionsPopoverProps<T>) {
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const context = useFilterContext()
  const baseId = useId()

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [open])

  useEffect(() => {
    if (highlightedIndex >= 0 && open) {
      const element = document.getElementById(`${baseId}-item-${highlightedIndex}`)
      element?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex, open, baseId])

  const isMultiSelect = field.type === "multiselect" || values.length > 1
  const effectiveValues = (field.value !== undefined ? (field.value as T[]) : values) || []

  const selectedOptions = field.options?.filter((opt) => effectiveValues.includes(opt.value)) || []
  const unselectedOptions = field.options?.filter((opt) => !effectiveValues.includes(opt.value)) || []

  const allFilteredOptions = useMemo(() => [...selectedOptions, ...unselectedOptions], [selectedOptions, unselectedOptions])

  const handleClose = () => {
    setOpen(false)
    onClose?.()
  }

  const renderMenuContent = () => (
    <>
      <div className="relative flex max-h-full">
        <div
          className="flex max-h-[min(var(--radix-dropdown-menu-content-available-height),24rem)] w-full scroll-pt-2 scroll-pb-2 flex-col overscroll-contain py-2"
          role="listbox"
          id={`${baseId}-listbox`}
        >
          <ScrollArea className="size-full min-h-0 **:data-[slot=scroll-area-scrollbar]:m-0 **:data-[slot=scroll-area-viewport]:h-full **:data-[slot=scroll-area-viewport]:overscroll-contain">
            {allFilteredOptions.length === 0 && (
              <div className="text-muted-foreground py-2 text-center text-sm">
                {context.i18n.noResultsFound}
              </div>
            )}

            {selectedOptions.length > 0 && (
              <DropdownMenuGroup className="px-1">
                {selectedOptions.map((option, index) => {
                  const isHighlighted = highlightedIndex === index
                  const itemId = `${baseId}-item-${index}`

                  return (
                    <DropdownMenuCheckboxItem
                      key={String(option.value)}
                      id={itemId}
                      role="option"
                      aria-selected={isHighlighted}
                      data-highlighted={isHighlighted || undefined}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      checked={true}
                      className={cn("data-highlighted:bg-accent data-highlighted:text-accent-foreground", option.className)}
                      onSelect={(e) => {
                        if (isMultiSelect) e.preventDefault()
                      }}
                      onCheckedChange={() => {
                        const next = effectiveValues.filter((v) => v !== option.value) as T[]
                        if (field.onValueChange) {
                          field.onValueChange(next)
                        } else {
                          onChange(next)
                        }
                        if (!isMultiSelect) handleClose()
                      }}
                    >
                      {option.icon && option.icon}
                      <span className="truncate">{option.label}</span>
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuGroup>
            )}

            {selectedOptions.length > 0 && unselectedOptions.length > 0 && (
              <DropdownMenuSeparator className="mx-0" />
            )}

            {unselectedOptions.length > 0 && (
              <DropdownMenuGroup className="px-1">
                {unselectedOptions.map((option, index) => {
                  const overallIndex = index + selectedOptions.length
                  const isHighlighted = highlightedIndex === overallIndex
                  const itemId = `${baseId}-item-${overallIndex}`

                  return (
                    <DropdownMenuCheckboxItem
                      key={String(option.value)}
                      id={itemId}
                      role="option"
                      aria-selected={isHighlighted}
                      data-highlighted={isHighlighted || undefined}
                      onMouseEnter={() => setHighlightedIndex(overallIndex)}
                      checked={false}
                      className={cn("data-highlighted:bg-accent data-highlighted:text-accent-foreground", option.className)}
                      onSelect={(e) => {
                        if (isMultiSelect) e.preventDefault()
                      }}
                      onCheckedChange={() => {
                        const next = isMultiSelect ? ([...effectiveValues, option.value] as T[]) : ([option.value] as T[])
                        if (isMultiSelect && field.maxSelections && next.length > field.maxSelections) return
                        
                        if (field.onValueChange) {
                          field.onValueChange(next)
                        } else {
                          onChange(next)
                        }
                        if (!isMultiSelect) handleClose()
                      }}
                    >
                      {option.icon && option.icon}
                      <span className="truncate">{option.label}</span>
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuGroup>
            )}
          </ScrollArea>
        </div>
      </div>
    </>
  )

  if (inline) {
    return <div className="w-full">{renderMenuContent()}</div>
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={context.size}>
          <div className="flex items-center gap-1.5">
            {field.customValueRenderer ? (
              field.customValueRenderer(values, field.options || [])
            ) : (
              <>
                {selectedOptions.length > 0 && (
                  <div className="flex items-center -space-x-1.5">
                    {selectedOptions.slice(0, 3).map((option) => (
                      <div key={String(option.value)}>{option.icon}</div>
                    ))}
                  </div>
                )}
                {selectedOptions.length === 1
                  ? selectedOptions[0].label
                  : selectedOptions.length > 1
                    ? `${selectedOptions.length} ${context.i18n.selectedCount}`
                    : context.i18n.select}
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={cn("w-[200px] px-0", field.className)}>
        {renderMenuContent()}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function FilterValueSelector<T = unknown>({
  field,
  values,
  onChange,
  operator: _operator,
  autoFocus,
}: {
  field: FilterFieldConfig<T>
  values: T[]
  onChange: (values: T[]) => void
  operator: string
  autoFocus?: boolean
}) {
  if (field.type === "text") {
    return (
      <FilterInput
        type="text"
        value={(values[0] as string) || ""}
        onChange={(e) => onChange([e.target.value] as T[])}
        placeholder={field.placeholder}
        pattern={field.pattern}
        field={field}
        className={cn("w-36", field.className)}
        autoFocus={autoFocus}
      />
    )
  }

  return <SelectOptionsPopover field={field} values={values} onChange={onChange} />
}

export interface Filter<T = unknown> {
  id: string
  field: string
  operator: string
  values: T[]
}

// ----------------------------------------------------------------------
// MAIN FILTERS COMPONENT
// ----------------------------------------------------------------------
interface FiltersProps<T = unknown> {
  filters: Filter<T>[]
  fields: FilterFieldsConfig<T>
  onChange: (filters: Filter<T>[]) => void
  className?: string
  variant?: "solid" | "default"
  size?: "sm" | "default" | "lg"
  radius?: "default" | "full"
  i18n?: Partial<FilterI18nConfig>
  showSearchInput?: boolean
  trigger?: React.ReactNode
  allowMultiple?: boolean
  menuPopupClassName?: string
  enableShortcut?: boolean
  shortcutKey?: string
  shortcutLabel?: string
  showAddTrigger?: boolean
  showAppliedFilters?: boolean
}

export function Filters<T = unknown>({
  filters,
  fields,
  onChange,
  className,
  variant = "default",
  size = "default",
  radius = "default",
  i18n,
  showSearchInput = true,
  trigger,
  allowMultiple = false, // DISABLED MULTIPLE BY DEFAULT
  menuPopupClassName,
  enableShortcut = false,
  shortcutKey = "f",
  showAddTrigger = true,
  showAppliedFilters = true,
}: FiltersProps<T>) {
  const [addFilterOpen, setAddFilterOpen] = useState(false)
  const [menuSearchInput, setMenuSearchInput] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [lastAddedFilterId, setLastAddedFilterId] = useState<string | null>(null)
  const rootInputRef = useRef<HTMLInputElement>(null)
  const rootId = useId()

  useEffect(() => {
    if (!enableShortcut) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === shortcutKey.toLowerCase() &&
        !addFilterOpen &&
        !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault()
        setAddFilterOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enableShortcut, shortcutKey, addFilterOpen])

  useEffect(() => {
    setHighlightedIndex(-1)
  }, [menuSearchInput])

  useEffect(() => {
    if (highlightedIndex >= 0 && addFilterOpen) {
      const element = document.getElementById(`${rootId}-item-${highlightedIndex}`)
      element?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex, addFilterOpen, rootId])

  const mergedI18n: FilterI18nConfig = {
    ...DEFAULT_I18N,
    ...i18n,
    placeholders: { ...DEFAULT_I18N.placeholders, ...i18n?.placeholders },
  }

  const fieldsMap = useMemo(() => getFieldsMap(fields), [fields])

  const updateFilter = useCallback(
    (filterId: string, updates: Partial<Filter<T>>) => {
      onChange(
        filters.map((filter) => {
          if (filter.id === filterId) {
            return { ...filter, ...updates }
          }
          return filter
        })
      )
    },
    [filters, onChange]
  )

  const removeFilter = useCallback(
    (filterId: string) => {
      onChange(filters.filter((filter) => filter.id !== filterId))
    },
    [filters, onChange]
  )

  const addFilter = useCallback(
    (fieldKey: string) => {
      const field = fieldsMap[fieldKey]
      if (field && field.key) {
        const defaultOperator = "is_any_of" // HARDCODED OPERATOR TO is_any_of
        const defaultValues: unknown[] = []
        const newFilter = createFilter<T>(fieldKey, defaultOperator, defaultValues as T[])
        setLastAddedFilterId(newFilter.id)
        onChange([...filters, newFilter])
        setAddFilterOpen(false)
        setMenuSearchInput("")
      }
    },
    [fieldsMap, filters, onChange]
  )

  const selectableFields = useMemo(() => {
    const flatFields = flattenFields(fields)
    return flatFields.filter((field) => {
      if (!field.key || field.type === "separator") return false
      if (allowMultiple) return true
      return !filters.some((filter) => filter.field === field.key)
    })
  }, [fields, filters, allowMultiple])

  const filteredFields = useMemo(() => {
    return selectableFields.filter(
      (f) => !menuSearchInput || f.label?.toLowerCase().includes(menuSearchInput.toLowerCase())
    )
  }, [selectableFields, menuSearchInput])

  return (
    <FilterContext.Provider
      value={{
        variant,
        size,
        radius,
        i18n: mergedI18n,
        className,
        trigger,
        allowMultiple,
      }}
    >
      <div className={cn(filtersContainerVariants({ variant, size }), className)}>
        {showAddTrigger && selectableFields.length > 0 && (
          <DropdownMenu
            open={addFilterOpen}
            onOpenChange={(open) => {
              setAddFilterOpen(open)
              if (!open) setMenuSearchInput("")
            }}
          >
            <DropdownMenuTrigger asChild>
              {trigger || (
                <Button variant="outline">
                  <PlusIcon />
                  {mergedI18n.addFilter}
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn("w-[220px]", menuPopupClassName)} align="start">
              {showSearchInput && (
                <>
                  <div className="relative">
                    <Input
                      ref={rootInputRef}
                      placeholder={mergedI18n.searchFields}
                      className="h-8 rounded-none border-0 bg-transparent! px-2 text-sm shadow-none focus-visible:ring-0"
                      value={menuSearchInput}
                      onChange={(e) => setMenuSearchInput(e.target.value)}
                    />
                  </div>
                  <DropdownMenuSeparator />
                </>
              )}

              <div className="relative flex max-h-full">
                <div className="flex max-h-64 w-full flex-col overscroll-contain">
                  <ScrollArea>
                    {filteredFields.length === 0 ? (
                      <div className="text-muted-foreground py-2 text-center text-sm">
                        {mergedI18n.noFieldsFound}
                      </div>
                    ) : (
                      filteredFields.map((field, index) => {
                        const isHighlighted = highlightedIndex === index
                        const itemId = `${rootId}-item-${index}`

                        // DISABLED HAS-SUBMENU - CLICKING WILL ALWAYS FIRE addFilter NOW
                        return (
                          <DropdownMenuItem
                            key={field.key}
                            id={itemId}
                            role="option"
                            aria-selected={isHighlighted}
                            data-highlighted={isHighlighted || undefined}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onClick={() => field.key && addFilter(field.key)}
                            className="data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                          >
                            {field.icon}
                            <span>{field.label}</span>
                          </DropdownMenuItem>
                        )
                      })
                    )}
                  </ScrollArea>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* RENDER ACTIVE FILTERS */}
        {showAppliedFilters &&
          filters.map((filter) => {
            const field = fieldsMap[filter.field]
            if (!field) return null
            return (
              <ButtonGroup key={filter.id}>
                <ButtonGroupText className="bg-background dark:bg-input/30">
                  {field.icon && field.icon}
                  {field.label}
                </ButtonGroupText>

                {/* OPERATOR DROPDOWN REMOVED ENTIRELY */}

                <FilterValueSelector<T>
                  field={field}
                  values={filter.values}
                  operator={filter.operator}
                  onChange={(values) => updateFilter(filter.id, { values })}
                  autoFocus={filter.id === lastAddedFilterId}
                />
                <FilterRemoveButton onClick={() => removeFilter(filter.id)} />
              </ButtonGroup>
            )
          })}
      </div>
    </FilterContext.Provider>
  )
}

export const createFilter = <T = unknown,>(
  field: string,
  operator?: string,
  values: T[] = []
): Filter<T> => ({
  id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
  field,
  operator: operator || "is_any_of",
  values,
})