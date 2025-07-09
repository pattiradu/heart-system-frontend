import { Pie, PieChart, Cell, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import backend from "@/utils"

// Pie slice color palette
const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "#8884d8",
  "#82ca9d",
]

// Default chart config to prevent ChartStyle error
const chartConfig = {
  desktop: {
    label: "Condition",
    color: "var(--chart-1)",
  },
}

export default function PieChartComponent() {
  const [info, setInfo] = useState([])
  const [isPending, setPending] = useState(false)

  async function readChartdata() {
    try {
      setPending(true)
      const { data } = await backend.get("stats/doctor-patient-conditions")
      setInfo(data)
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    readChartdata()
  }, [])

  if (isPending) {
    return <h1 className="text-2xl pt-10 text-center">Please wait ...</h1>
  }

  if (!isPending && info.length === 0) {
    return <h1 className="text-2xl pt-10 text-center">No data available</h1>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients by Category</CardTitle>
        <CardDescription>
          This pie chart represents patient distribution by condition.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-[400px] w-full flex items-center justify-center"
          config={chartConfig}
        >
          <PieChart width={400} height={400}>
            <Pie
              data={info}
              dataKey="total"
              nameKey="condition"
              cx="50%"
              cy="50%"
              outerRadius={130}
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
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
