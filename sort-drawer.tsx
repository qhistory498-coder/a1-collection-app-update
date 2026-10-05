"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { SORT_OPTIONS, type SortKey } from "@/lib/filters"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: SortKey
  onChange: (value: SortKey) => void
}

export function SortDrawer({ open, onOpenChange, value, onChange }: Props) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="mx-auto max-w-lg">
        <DrawerHeader className="border-b border-border pb-3 text-left">
          <DrawerTitle className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Sort By
          </DrawerTitle>
        </DrawerHeader>
        <ul role="radiogroup" aria-label="Sort products" className="flex flex-col pb-[max(1rem,env(safe-area-inset-bottom))]">
          {SORT_OPTIONS.map((o) => {
            const active = o.key === value
            return (
              <li key={o.key}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    onChange(o.key)
                    onOpenChange(false)
                  }}
                  className={cn(
                    "flex h-12 w-full items-center justify-between px-4 text-left text-sm text-foreground active:bg-muted",
                    active && "font-semibold",
                  )}
                >
                  {o.label}
                  {active && <Check className="size-4" aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  )
}
