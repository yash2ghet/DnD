"use client";

import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart, barClasses } from "@mui/x-charts/BarChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  labels: string[];
  seriesData: {
    id: string;
    data: number[];
    label?: string;
    barLabel?: "value";
  }[];
};

export default function BarChartCard({
  labels,
  seriesData,
}: Props) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Bar Chart
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparison across groups
        </p>
      </CardHeader>

      <CardContent className="px-2 text-foreground">
        <BarChart
          xAxis={[{ data: labels }]}
          series={seriesData}
          height={270}
          margin={{ left: 0 }}
          sx={{
            [`& .${barClasses.series}[data-series="1"] .${barClasses.element}`]:
              {
                fill: "url(#bar-gradient)",
              },
            [`& .${barClasses.seriesLabels}[data-series="1"] .${barClasses.label}`]:
              {
                fontWeight: "bold",
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
        >
          <defs>
            <linearGradient
              id="bar-gradient"
              gradientTransform="rotate(90)"
            >
              <stop offset="5%" stopColor="gold" />
              <stop offset="95%" stopColor="red" />
            </linearGradient>
          </defs>
        </BarChart>
      </CardContent>
    </Card>
  );
}