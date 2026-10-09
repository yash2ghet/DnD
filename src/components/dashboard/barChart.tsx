"use client";

import { BarChart, barClasses } from "@mui/x-charts/BarChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const settings = {
  xAxis: [{ data: ["Group A", "Group B", "Group C"] }],
  series: [
    { id: "0", data: [4, 3, 5] },
    { id: "1", data: [1, 6, 3] },
    { id: "2", data: [2, 5, 6], barLabel: "value" as const },
  ],
  height: 270,
  margin: { left: 0 },
} as const;

export default function BarChartCard() {
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

      <CardContent className="px-2">
        <BarChart
          {...settings}
          sx={{
            [`& .${barClasses.series}[data-series="1"] .${barClasses.element}`]:
              {
                fill: "url(#bar-gradient)",
              },
            [`& .${barClasses.seriesLabels}[data-series="1"] .${barClasses.label}`]:
              {
                fontWeight: "bold",
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