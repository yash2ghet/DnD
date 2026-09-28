export type Task = {
  id: string
  number: number
  title: string
  description?: string
  type: string
  priority: string
  due?: {
    label: string
    overdue?: boolean
  }
  assignees: {
    name: string
    src?: string
  }[]
  checklist: {
    id: string
    label: string
    done: boolean
  }[]
}

export type ColumnMeta = {
  id: string
  title: string
  color: string
}

export const COLUMNS: ColumnMeta[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "#94a3b8",
  },
  {
    id: "todo",
    title: "Todo",
    color: "#64748b",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#3b82f6",
  },
  {
    id: "review",
    title: "Review",
    color: "#a855f7",
  },
  {
    id: "qa",
    title: "QA",
    color: "#f59e0b",
  },
  {
    id: "done",
    title: "Done",
    color: "#22c55e",
  },
]

export const TASKS: Record<string, Task> = {
  t1: {
    id: "t1",
    number: 1,
    title: "UK MSRP",
    description: "given by jatin",
    type: "Feature",
    priority: "High",
    due: {
      label: "Due today",
    },
    assignees: [
      { name: "Yashvi" },
      { name: "Manan" },
    ],
    checklist: [
      {
        id: "c1",
        label: "UK MSRP Manan",
        done: false,
      },
      {
        id: "c2",
        label: "UK MSRP Yashvi",
        done: false,
      },
    ],
  },

  t2: {
    id: "t2",
    number: 2,
    title: "ScreenSize upload to Motospex",
    description: "swayam and deep",
    type: "Feature",
    priority: "High",
    due: {
      label: "Overdue by 3 days",
      overdue: true,
    },
    assignees: [
      { name: "Swayam" },
      { name: "Kaushal" },
    ],
    checklist: [
      {
        id: "c3",
        label: "ScreenSize Upload for Swayam",
        done: false,
      },
      {
        id: "c4",
        label: "ScreenSize Upload for Deep",
        done: false,
      },
    ],
  },
}

export const INITIAL_ITEMS: Record<string, string[]> = {
  backlog: [],
  todo: [],
  "in-progress": ["t1", "t2"],
  review: [],
  qa: [],
  done: [],
}