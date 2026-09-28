"use client"

import {
  CalendarClock,
  ChevronUp,
  Sparkles,
} from "lucide-react"

import { useSortable } from "@dnd-kit/react/sortable"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

import type { Task } from "./board-data"

type TaskCardProps = {
  task: Task
  index: number
  column: string
}

export function TaskCard({
  task,
  index,
  column,
}: TaskCardProps) {
  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    type: "item",
    accept: "item",
    group: column,
  })

  const done = task.checklist.filter(
    (item) => item.done
  ).length

  const percentage =
    task.checklist.length > 0
      ? (done / task.checklist.length) * 100
      : 0

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      className="cursor-grab data-[dragging=true]:opacity-60"
    >
      <div className="rounded-md border bg-card p-3 text-card-foreground shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-violet-500" />

            <span className="truncate">
              {task.type}
            </span>

            <span className="font-mono">
              #{task.number}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1 font-medium text-orange-500">
            <ChevronUp className="size-3.5" />
            {task.priority}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">
          {task.title}
        </p>

        {task.description && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-snug">
            {task.description}
          </p>
        )}

        <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
          {task.due && (
            <span
              className={
                task.due.overdue
                  ? "text-destructive flex items-center gap-1 font-medium"
                  : "text-amber-600 dark:text-amber-500 flex items-center gap-1"
              }
            >
              <CalendarClock className="size-3.5" />

              {task.due.label}
            </span>
          )}

          <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background">
            {task.assignees.map((assignee) => (
              <Avatar
                key={assignee.name}
                size="sm"
              >
                {assignee.src && (
                  <AvatarImage
                    src={assignee.src}
                    alt={assignee.name}
                  />
                )}

                <AvatarFallback>
                  {assignee.name[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {task.checklist.length > 0 && (
          <div className="mt-3 border-t pt-2.5">
            <div className="mb-1.5 flex items-center gap-2">
              <Progress
                value={percentage}
                className="h-1.5 flex-1"
              />

              <span className="text-muted-foreground text-[10px] tabular-nums">
                {done}/{task.checklist.length}
              </span>
            </div>

            <ul className="space-y-1">
              {task.checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2"
                >
                  <Checkbox
                    defaultChecked={item.done}
                    aria-label={item.label}
                    className="mt-0.5 size-3.5"
                  />

                  <span className="text-xs leading-snug">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}