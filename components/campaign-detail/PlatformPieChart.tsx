import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const platformData = [
  { platform: "facebook", value: 54, fill: "var(--color-facebook)" },
  { platform: "instagram", value: 31, fill: "var(--color-instagram)" },
  { platform: "audience", value: 15, fill: "var(--color-audience)" },
];

const chartConfig = {
  value: {
    label: "Percentage",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(213.1 93.9% 67.8%)",
  },
  audience: {
    label: "Audience Network",
    color: "hsl(213.3 96.9% 87.3%)",
  },
} satisfies ChartConfig;

const PlatformPieChart = () => {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
      <PieChart>
        <Pie 
          data={platformData} 
          dataKey="value"
          nameKey="platform"
        />
        <ChartTooltip 
          content={<ChartTooltipContent />} 
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="platform" payload={[]} />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-auto [&>*]:justify-center [&>*]:whitespace-nowrap"
        />
      </PieChart>
    </ChartContainer>
  );
};

export default PlatformPieChart;
