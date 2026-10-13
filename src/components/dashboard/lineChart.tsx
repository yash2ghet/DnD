"use client";

import { axisClasses } from "@mui/x-charts/ChartsAxis";
import {
  LineChart,
  lineClasses,
} from "@mui/x-charts/LineChart";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  labels: string[];
  seriesData: {
    data: number[];
    label: string;
    area: true;
    stack: string;
  }[];
};

const margin = { right: 24 };

export default function StackedAreaChart({
  labels,
  seriesData,
}: Props) {
  return (
    <Card className="min-w-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Weekly Activity
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Activity trends throughout the week
        </p>
      </CardHeader>

      <CardContent className="px-2 sm:px-4 text-foreground">
        <div className="h-[300px] w-full">
          <LineChart
            series={seriesData}
            xAxis={[
              {
                scaleType: "point",
                data: labels,
                height: 28,
              },
            ]}
            yAxis={[{ width: 50 }]}
            sx={{
              [`& .${lineClasses.line}`]: {
                display: "none",
              },
              [`& .${axisClasses.tickLabel}`]: { fill: "currentColor" },
              [`& .${axisClasses.line}, & .${axisClasses.tick}`]: { stroke: "currentColor" },
              "& .MuiChartsLegend-root, & .MuiChartsLegend-root *": {
                color: "#fff",
              },
              "& .MuiChartsLegend-root text": {
                fill: "#fff",
              },
            }}
            margin={margin}
            height={300}
          />
        </div>
      </CardContent>
    </Card>
  );
}