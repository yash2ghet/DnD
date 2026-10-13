"use client";

import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { getDashboardData } from "../../../../lib/dashboard-api";
import type { DashboardData } from "../../../types/dashboard";

import DonutChart from "@/components/dashboard/donutChart";
import BarChartCard from "@/components/dashboard/barChart";
import StackedAreaChart from "@/components/dashboard/lineChart";

export default function Dashboard() {

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      getDashboardData()
        .then(setData)
        .catch(() => setError("Failed to load dashboard data."))
        .finally(() => setLoading(false));
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <main className="p-6">Loading dashboard...</main>;
  }

  if (error || !data) {
    return <main className="p-6">{error ?? "No dashboard data available."}</main>;
  }

  const stats = [
    {
      title: "Total Members",
      value: data.stats.totalMembers.toLocaleString(),
      description: "Registered members",
      icon: Users,
    },
    {
      title: "Total Tasks",
      value: data.stats.totalTasks.toLocaleString(),
      description: "All tasks",
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: data.stats.completed.toLocaleString(),
      description: `${data.stats.completedPercentage}% of total tasks`,
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: data.stats.pending.toLocaleString(),
      description: `${data.stats.pendingPercentage}% of total tasks`,
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-full overflow-y-auto bg-muted/40 p-6 pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Overview of team and tasks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>

                      <p className="text-2xl font-bold">
                        {stat.value}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-3">
                      <Icon className="size-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-0">
          <DonutChart
            data={data.taskStatus.map((item, index) => ({
              ...item,
              color: ["#0088FE", "#00C49F", "#FFBB28"][index],
            }))}
          />

          <BarChartCard
            labels={data.monthly.map((item) => item.month)}
            seriesData={[
              {
                id: "0",
                label: "Created",
                data: data.monthly.map((item) => item.created),
              },
              {
                id: "1",
                label: "Completed",
                data: data.monthly.map((item) => item.completed),
                barLabel: "value",
              },
              {
                id: "2",
                label: "Pending",
                data: data.monthly.map((item) => item.created - item.completed),
                barLabel: "value",
              },
            ]}
          />

          <StackedAreaChart
            labels={data.monthly.map((item) => item.month)}
            seriesData={[
              {
                data: data.monthly.map((item) => item.created),
                label: "Created",
                area: true,
                stack: "total",
              },
              {
                data: data.monthly.map((item) => item.completed),
                label: "Completed",
                area: true,
                stack: "total",
              },
              {
                data: data.monthly.map((item) => item.created - item.completed),
                label: "Pending",
                area: true,
                stack: "total",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

