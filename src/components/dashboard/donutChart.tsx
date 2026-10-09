"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { label: "Group A", value: 400, color: "#0088FE" },
  { label: "Group B", value: 300, color: "#00C49F" },
  { label: "Group C", value: 300, color: "#FFBB28" },
  { label: "Group D", value: 200, color: "#FF8042" },
];

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center p-10">
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 100,
              data,
              arcLabel: "value",
            },
          ]}
          {...settings}
        />
      </CardContent>
    </Card>
  );
}