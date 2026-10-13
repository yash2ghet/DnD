export type DashboardData = {
  stats: {
    totalMembers: number;
    totalTasks: number;
    completed: number;
    pending: number;
    completedPercentage: number;
    pendingPercentage: number;
  };

  taskStatus: {
    label: string;
    value: number;
  }[];

  monthly: {
    month: string;
    created: number;
    completed: number;
  }[];
};