import { KanbanBoard } from "@/components/board/kanban-board"

export default function BoardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Data Team</h1>
        <p className="text-sm text-muted-foreground">
          Manage your team&apos;s tasks
        </p>
      </div>

      <KanbanBoard />
    </div>
  )
}