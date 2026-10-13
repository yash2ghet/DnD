"use client";

import { PieChart } from "@mui/x-charts/PieChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
};

const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export default function DonutChart({ data }: Props) {
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