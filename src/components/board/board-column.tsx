"use client"

import {
  ChevronLeft,
  GripVertical,
  Plus,
} from "lucide-react"

import { useSortable } from "@dnd-kit/react/sortable"
import { CollisionPriority } from "@dnd-kit/abstract"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { ColumnMeta } from "./board-data"

type BoardColumnProps = {
  id: string
  index: number
  meta: ColumnMeta
  count: number
  children: React.ReactNode
}

export function BoardColumn({
  id,
  index,
  meta,
  count,
  children,
}: BoardColumnProps) {
  const {
    ref,
    handleRef,
    isDragging,
  } = useSortable({
    id,
    index,
    type: "column",
    collisionPriority: CollisionPriority.Low,
    accept: ["item", "column"],
  })

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="group/col flex h-full w-72 shrink-0 flex-col overflow-hidden rounded-xl border bg-muted/40 data-[dragging=true]:opacity-60"
    >
      <div
        className="h-[3px]"
        style={{
          backgroundColor: meta.color,
        }}
      />

      <div className="flex shrink-0 items-center justify-between gap-2 p-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            ref={handleRef}
            type="button"
            aria-label={`Reorder ${meta.title}`}
            className="-ml-1 cursor-grab touch-none text-muted-foreground/60 hover:text-foreground"
          >
            <GripVertical className="size-4" />
          </button>

          <span
            className="size-2.5 shrink-0 rounded-full ring-1 ring-black/5 dark:ring-white/10"
            style={{
              backgroundColor: meta.color,
            }}
          />

          <span className="truncate text-sm font-medium">
            {meta.title}
          </span>

          <Badge variant="secondary">
            {count}
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          aria-label={`Collapse ${meta.title}`}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 pb-2">
        {children}
      </div>

      <div className="flex shrink-0 items-center border-t border-border/60">
        <button
          type="button"
          className="flex items-center gap-1 px-3 py-2 text-sm opacity-80 hover:opacity-100"
        >
          <Plus className="size-4" />

          Add task
        </button>
      </div>
    </div>
  )
}