"use client"

import * as React from "react"

import { DragDropProvider } from "@dnd-kit/react"
import { move } from "@dnd-kit/helpers"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import {
  COLUMNS,
  INITIAL_ITEMS,
  TASKS,
} from "./board-data"

import { BoardColumn } from "./board-column"
import { TaskCard } from "./task-card"

export function KanbanBoard() {
  const [items, setItems] = React.useState(INITIAL_ITEMS)

  const [columnOrder, setColumnOrder] =
    React.useState(
      COLUMNS.map((column) => column.id)
    )

  const snapshot = React.useRef(items)

  const columnsById = React.useMemo(
    () =>
      Object.fromEntries(
        COLUMNS.map((column) => [
          column.id,
          column,
        ])
      ),
    []
  )

  return (
    <DragDropProvider
      onDragStart={() => {
        snapshot.current =
          structuredClone(items)
      }}

      onDragOver={(event) => {
        const { source } =
          event.operation

        if (source?.type === "column") {
          return
        }

        setItems((previous) =>
          move(previous, event)
        )
      }}

      onDragEnd={(event) => {
        const { source } =
          event.operation

        if (event.canceled) {
          if (source?.type === "item") {
            setItems(snapshot.current)
          }

          return
        }

        if (source?.type === "column") {
          setColumnOrder((previous) =>
            move(previous, event)
          )
        }
      }}
    >
      <div className="flex min-h-0 flex-1 items-start gap-4 overflow-x-auto pb-4">
        {columnOrder.map(
          (columnId, index) => {
            const column =
              columnsById[columnId]

            return (
              <BoardColumn
                key={columnId}
                id={columnId}
                index={index}
                meta={column}
                count={
                  items[columnId].length
                }
              >
                {items[columnId].length ===
                0 ? (
                  <div className="text-muted-foreground/70 border-border/60 flex flex-1 items-center justify-center rounded-lg border border-dashed py-6 text-xs">
                    No tasks
                  </div>
                ) : (
                  items[columnId].map(
                    (taskId, index) => (
                      <TaskCard
                        key={taskId}
                        task={TASKS[taskId]}
                        index={index}
                        column={columnId}
                      />
                    )
                  )
                )}
              </BoardColumn>
            )
          }
        )}

        <Button
          variant="outline"
          className="h-10 w-72 shrink-0 justify-start"
        >
          <Plus className="size-4" />

          Add column
        </Button>
      </div>
    </DragDropProvider>
  )
}