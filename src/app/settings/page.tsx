// import { BarChart } from '@mui/x-charts/BarChart';

// export default function SimpleCharts() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-xl font-semibold mb-2 text-black">
//           Sales Overview
//         </h1>

//         <p className="text-sm text-gray-500 mb-4">
//           Simple bar chart demonstration
//         </p>

//         <BarChart
//           xAxis={[
//             {
//               id: 'barCategories',
//               data: ['bar A', 'bar B', 'bar C'],
//               height: 28,
//             },
//           ]}
//           series={[
//             {
//               data: [2, 5, 3],
//             },
//           ]}
//           height={300}
//           width={500}
//         />
//       </div>
//     </div>
//   );
// }


// "use client";

// import type {} from '@mui/x-charts/themeAugmentation';

// import Box from '@mui/material/Box';
// import { BarPlot } from '@mui/x-charts/BarChart';
// import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
// import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
// import { AllSeriesType } from '@mui/x-charts/models';
// import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
// import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
// import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
// import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
// import alphabetStock from '../../dataset/GOOGL.json';

// const series = [
//   {
//     type: 'bar',
//     yAxisId: 'volume',
//     label: 'Volume',
//     color: 'lightgray',
//     data: alphabetStock.map((day) => day.volume),
//     highlightScope: { highlight: 'item' },
//   },
//   {
//     type: 'line',
//     yAxisId: 'price',
//     color: 'red',
//     label: 'Low',
//     data: alphabetStock.map((day) => day.low),
//     highlightScope: { highlight: 'item' },
//   },
//   {
//     type: 'line',
//     yAxisId: 'price',
//     color: 'green',
//     label: 'High',
//     data: alphabetStock.map((day) => day.high),
//   },
// ] as AllSeriesType[];

// export default function Combining() {
//   return (
//     <main className="p-40">
//     <Box className="px-20 w-full h-[400px] bg-white rounded-xl border p-4">
//       <ChartsContainer
//         series={series}
//         xAxis={[
//           {
//             id: 'date',
//             data: alphabetStock.map((day) => new Date(day.date)),
//             scaleType: 'band',
//             valueFormatter: (value) => value.toLocaleDateString(),
//             height: 48,
//           },
//         ]}
//         yAxis={[
//           { id: 'price', scaleType: 'linear', position: 'left', width: 50 },
//           {
//             id: 'volume',
//             scaleType: 'linear',
//             position: 'right',
//             valueFormatter: (value) => `${(value / 1000000).toLocaleString()}M`,
//             width: 55,
//           },
//         ]}
//       >
//         <ChartsAxisHighlight x="line" />
//         <BarPlot />
//         <LinePlot />

//         <LineHighlightPlot />
//         <ChartsXAxis
//           label="Date"
//           axisId="date"
//           tickInterval={(value, index) => {
//             return index % 30 === 0;
//           }}
//           tickLabelStyle={{
//             fontSize: 10,
//           }}
//         />
//         <ChartsYAxis
//           label="Alphabet Stock Price (USD)"
//           axisId="price"
//           tickLabelStyle={{ fontSize: 10 }}
//         />
//         <ChartsYAxis
//           label="Volume"
//           axisId="volume"
//           tickLabelStyle={{ fontSize: 10 }}
//         />
//         <ChartsTooltip />
//       </ChartsContainer>
//     </Box>
//     </main>
//   );
// }


// "use client";

// import Box from '@mui/material/Box';
// import { BarChart } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

// export default function SimpleBarChart() {
//   return (
//     <main className="bg-white p-46">
//     <Box sx={{ width: '100%', height: 400 }}>
//       <BarChart
//         series={[
//           { data: pData, label: 'pv', id: 'pvId' },
//           { data: uData, label: 'uv', id: 'uvId' },
//         ]}
//         xAxis={[{ data: xLabels, height: 28 }]}
//         yAxis={[{ width: 50 }]}
//       />
//     </Box>
//     </main>
//   );
// }

// "use client";

// import { PieChart } from '@mui/x-charts/PieChart';

// const data = [
//   { label: 'Group A', value: 400, color: '#0088FE' },
//   { label: 'Group B', value: 300, color: '#00C49F' },
//   { label: 'Group C', value: 300, color: '#FFBB28' },
//   { label: 'Group D', value: 200, color: '#FF8042' },
//   { label: 'Group E', value: 100, color: '#df49cb' },
// ];

// const settings = {
//   margin: { right: 5 },
//   width: 200,
//   height: 200,
//   hideLegend: true,
// };

// export default function DonutChart() {
//   return (
//     <PieChart
//       series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
//       {...settings}
//     />
//   );
// }

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

import DonutChart from "@/components/dashboard/donutChart";
import BarChartCard from "@/components/dashboard/barChart";
import StackedAreaChart from "@/components/dashboard/lineChart";

const stats = [
  {
    title: "Total Members",
    value: "1,248",
    description: "+12% from last month",
    icon: Users,
  },
  {
    title: "Total Tasks",
    value: "86",
    description: "+8 today",
    icon: ClipboardList,
  },
  {
    title: "Completed",
    value: "64",
    description: "74.4% of total tasks",
    icon: CheckCircle2,
  },
  {
    title: "Pending",
    value: "22",
    description: "25.6% of total tasks",
    icon: Clock3,
  },
];

export default function Dashboard() {
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
          <DonutChart />
          <BarChartCard />
          <StackedAreaChart />
        </div>
      </div>
    </main>
  );
}

