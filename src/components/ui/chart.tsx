"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";

type ChartConfig = Record<
  string,
  { label?: string; color?: string; theme?: Record<"light" | "dark", string> }
>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  const mergedColor = (key: string) => {
    const item = config[key];
    if (!item) return undefined;
    if (item.color) return item.color;
    if (item.theme) {
      const theme = typeof window !== "undefined"
        ? document.documentElement.classList.contains("dark") ? "dark" : "light"
        : "dark";
      return item.theme[theme as keyof typeof item.theme];
    }
    return undefined;
  };

  const cssVars = Object.entries(config).reduce<Record<string, string>>(
    (acc, [key]) => {
      const color = mergedColor(key);
      if (color) acc[`--color-${key}`] = color;
      return acc;
    },
    {}
  );

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        style={{ ...cssVars } as React.CSSProperties}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle config={config} />
        {children}
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ config }: { config: ChartConfig }) {
  const cssVars = React.useMemo(() => {
    return Object.entries(config)
      .filter(([, item]) => item.theme?.["dark"] || item.theme?.["light"])
      .map(([key, item]) => {
        const light = item.theme?.light;
        const dark = item.theme?.dark;
        return `  ${dark ? `.dark { --color-${key}: ${dark}; }` : ""} ${light ? `:root { --color-${key}: ${light}; }` : ""}`;
      })
      .join("\n");
  }, [config]);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {\n${cssVars}\n}`,
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string | number; name: string | number; color?: string; payload?: { fill?: string }; unit?: string }>;
  label?: string | number;
  className?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  color?: string;
  labelFormatter?: (value: string | number, payload: unknown[]) => React.ReactNode;
  formatter?: (value: number, name: string | number, item: unknown, index: number, payload: unknown) => React.ReactNode;
}) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const item = payload[0];
    const key = `${labelKey ?? item.dataKey ?? item.name ?? "value"}`;
    const itemConfig = config[key];
    const value =
      !labelKey && typeof label === "string"
        ? config[label as keyof typeof config]?.label ?? label
        : itemConfig?.label ?? key;

    if (labelFormatter) return labelFormatter(value, payload);
    return value;
  }, [label, labelFormatter, payload, hideLabel, labelKey, config]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index: number) => {
          const key = `${nameKey ?? item.dataKey ?? item.name ?? "value"}`;
          const itemConfig = config[key];
          const indicatorColor = color || item.payload?.fill || item.color || "#ccc";

          return (
            <div
              key={item.dataKey as string}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item.value !== undefined && item.name !== undefined
                ? formatter(item.value, item.name, item, index, item.payload)
                : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                          indicator === "dot" && "h-2.5 w-2.5",
                          indicator === "line" && "w-1",
                          indicator === "dashed" && "w-0 border-[1.5px] border-dashed bg-transparent",
                          indicator === "dot" && "mt-1"
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as React.CSSProperties
                        }
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}{item.unit}
                        </span>
                      )}
                    </div>
                  </>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> & {
  payload?: Array<{ value: string; color?: string }>;
  verticalAlign?: "top" | "bottom";
  hideIcon?: boolean;
  nameKey?: string;
}) {
  const { config } = useChart();

  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item: { value: string; color?: string }) => {
        const key = `${nameKey ?? item.value}`;
        const itemConfig = config[key];

        return (
          <div
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            )}
          >
            {!hideIcon && (
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label ?? item.value}
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
