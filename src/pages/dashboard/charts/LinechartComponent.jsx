import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import backend from "@/utils";

const chartConfig = {
  desktop: {
    label: "Category",
    color: "var(--chart-1)",
  },
};

export default function Linechartcomponent() {
  const [info, setInfo] = useState([]);
  const [isPending, setPending] = useState(false);

  async function readChartdata() {
    try {
      setPending(true);
      const { data } = await backend.get("stats/doctor-patient-conditions");
      setInfo(data);
    } catch (error) {
      console.log(error);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients and categories</CardTitle>
        <CardDescription>
          This charts shows the available patients within category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer>
            <BarChart
              accessibilityLayer
              data={info}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="condition"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.split(" ")[0]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="total"
                fill="var(--color-desktop)"
                radius={8}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
