import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import backend from "@/utils";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "#8884d8",
  "#82ca9d",
];

const chartConfig = {
  desktop: {
    label: "Condition",
    color: "var(--chart-1)",
  },
};

export default function PieChartComponent() {
  const [info, setInfo] = useState([]);
  const [isPending, setPending] = useState(false);

  async function readChartdata() {
    try {
      setPending(true);
      const { data } = await backend.get("stats/doctor-patient-conditions");
      setInfo(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    readChartdata();
  }, []);

  if (isPending) {
    return <h1 className="text-2xl pt-10 text-center">Please wait ...</h1>;
  }

  if (!isPending && info.length === 0) {
    return <h1 className="text-2xl pt-10 text-center">No data available</h1>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Patients by Category</CardTitle>
        <CardDescription>
          This pie chart represents patient distribution by condition.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={info}
                dataKey="total"
                nameKey="condition"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {info.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "transparent" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
