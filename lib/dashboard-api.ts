import type { DashboardData } from "@/types/dashboard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardData(): Promise<DashboardData> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/api/dashboard`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.status}`);
  }

  return response.json();
}
