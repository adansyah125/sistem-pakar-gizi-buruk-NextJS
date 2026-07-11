"use client";

import { memo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartAreaProps {
  data: Array<{ name: string; total: number }>;
}

export const ChartArea = memo(function ChartArea({ data }: ChartAreaProps) {
  const hasData = data.some((d) => d.total > 0);
  const mainColor = "#818cf8";
  const maxVal = Math.max(...data.map((d) => d.total), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">
          Diagnosa per Penyakit
        </CardTitle>
        <CardDescription className="text-sm">
          Jenis penyakit yang paling banyak di diagnosis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Belum ada data diagnosa
          </div>
        ) : (
          <ChartContainer
            config={{ total: { label: "Jumlah Diagnosa" } }}
            className="block h-[350px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={data}
                margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
              >
                <PolarGrid
                  gridType="circle"
                  stroke="var(--border)"
                />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickLine={false}
                />
                <PolarRadiusAxis
                  angle={90}
                  tick={false}
                  axisLine={false}
                  domain={[0, maxVal]}
                />
                <ChartTooltip
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Radar
                  name="total"
                  dataKey="total"
                  fill={mainColor}
                  fillOpacity={0.25}
                  stroke={mainColor}
                  strokeWidth={2}
                  dot={{ fill: mainColor, r: 4, strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: mainColor,
                    strokeWidth: 2,
                    stroke: "var(--background)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
});
