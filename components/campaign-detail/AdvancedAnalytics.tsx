import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, XAxis } from "recharts";

// Mock data for analytics
const viewsByDevice = [
  { device: "Android", count: 264 },
  { device: "iPhone", count: 321 },
  { device: "Other", count: 69 },
];

const clicksByDevice = [
  { device: "Android", count: 27 },
  { device: "iPhone", count: 24 },
  { device: "Other", count: 4 },
];

const viewsByAge = [
  { age: "18-24", count: 7 },
  { age: "25-34", count: 16 },
  { age: "35-44", count: 39 },
  { age: "45-54", count: 59 },
  { age: "55-64", count: 112 },
  { age: "65+", count: 421 },
];

const clicksByAge = [
  { age: "18-24", count: 0 },
  { age: "25-34", count: 0 },
  { age: "35-44", count: 0 },
  { age: "45-54", count: 6 },
  { age: "55-64", count: 9 },
  { age: "65+", count: 40 },
];

const viewsByGender = [
  { gender: "Female", count: 280 },
  { gender: "Male", count: 340 },
  { gender: "Unknown", count: 34 },
];

const clicksByGender = [
  { gender: "Female", count: 18 },
  { gender: "Male", count: 32 },
  { gender: "Unknown", count: 5 },
];

const viewsByPlatform = [
  { platform: "Facebook", count: 550 },
  { platform: "Instagram", count: 104 },
];

const clicksByPlatform = [
  { platform: "Facebook", count: 48 },
  { platform: "Instagram", count: 7 },
];

const viewsOverTime = [
  { date: "Oct 1", views: 32 },
  { date: "Oct 2", views: 45 },
  { date: "Oct 3", views: 38 },
  { date: "Oct 4", views: 52 },
  { date: "Oct 5", views: 48 },
  { date: "Oct 6", views: 55 },
  { date: "Oct 7", views: 62 },
  { date: "Oct 8", views: 58 },
  { date: "Oct 9", views: 67 },
  { date: "Oct 10", views: 71 },
  { date: "Oct 11", views: 65 },
  { date: "Oct 12", views: 78 },
  { date: "Oct 13", views: 82 },
  { date: "Oct 14", views: 88 },
  { date: "Oct 15", views: 95 },
  { date: "Oct 16", views: 102 },
  { date: "Oct 17", views: 98 },
  { date: "Oct 18", views: 110 },
  { date: "Oct 19", views: 115 },
  { date: "Oct 20", views: 108 },
  { date: "Oct 21", views: 120 },
  { date: "Oct 22", views: 125 },
  { date: "Oct 23", views: 118 },
  { date: "Oct 24", views: 132 },
  { date: "Oct 25", views: 128 },
  { date: "Oct 26", views: 135 },
  { date: "Oct 27", views: 142 },
  { date: "Oct 28", views: 138 },
  { date: "Oct 29", views: 145 },
  { date: "Oct 30", views: 150 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "#09f",
  },
  count: {
    label: "Count",
    color: "#09f",
  },
  Android: {
    label: "Android",
    color: "#09f",
  },
  iPhone: {
    label: "iPhone",
    color: "#e89eee",
  },
  Other: {
    label: "Other",
    color: "#969696",
  },
  Male: {
    label: "Male",
    color: "#09f",
  },
  Female: {
    label: "Female",
    color: "#e89eee",
  },
  Unknown: {
    label: "Unknown",
    color: "#969696",
  },
  Facebook: {
    label: "Facebook",
    color: "#09f",
  },
  Instagram: {
    label: "Instagram",
    color: "#e89eee",
  },
} satisfies ChartConfig;

export const AdvancedAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Views Over Time - Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Views Over Time</CardTitle>
          <CardDescription>Daily view trends for your campaign</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={chartConfig} className="h-[300px] sm:h-[350px] w-full">
            <AreaChart
              accessibilityLayer
              data={viewsOverTime}
              margin={{
                left: 0,
                right: 0,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <ChartTooltip
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: '3 3' }}
                content={<ChartTooltipContent />}
              />
              <defs>
                <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-views)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-views)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="views"
                type="monotone"
                fill="url(#fillViews)"
                fillOpacity={0.4}
                stroke="var(--color-views)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2-Column Grid for Device Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Views by Device */}
        <Card>
          <CardHeader>
            <CardTitle>Views by Device</CardTitle>
            <CardDescription>Device breakdown of ad impressions</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <BarChart accessibilityLayer data={viewsByDevice}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="device"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Clicks by Device */}
        <Card>
          <CardHeader>
            <CardTitle>Clicks by Device</CardTitle>
            <CardDescription>Device breakdown of ad clicks</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <BarChart accessibilityLayer data={clicksByDevice}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="device"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 2-Column Grid for Age Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Views by Age */}
        <Card>
          <CardHeader>
            <CardTitle>Views by Age</CardTitle>
            <CardDescription>Age demographic breakdown of views</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <BarChart accessibilityLayer data={viewsByAge}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="age"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Clicks by Age */}
        <Card>
          <CardHeader>
            <CardTitle>Clicks by Age</CardTitle>
            <CardDescription>Age demographic breakdown of clicks</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <BarChart accessibilityLayer data={clicksByAge}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="age"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 2-Column Grid for Gender Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Views by Gender */}
        <Card>
          <CardHeader>
            <CardTitle>Views by Gender</CardTitle>
            <CardDescription>Gender distribution of ad views</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={viewsByGender}
                  dataKey="count"
                  nameKey="gender"
                  innerRadius={50}
                  strokeWidth={5}
                >
                  {viewsByGender.map((entry) => (
                    <Cell key={entry.gender} fill={`var(--color-${entry.gender})`} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl sm:text-3xl font-bold">
                              {viewsByGender.reduce((a, b) => a + b.count, 0)}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs sm:text-sm">
                              Total Views
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Clicks by Gender */}
        <Card>
          <CardHeader>
            <CardTitle>Clicks by Gender</CardTitle>
            <CardDescription>Gender distribution of ad clicks</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={clicksByGender}
                  dataKey="count"
                  nameKey="gender"
                  innerRadius={50}
                  strokeWidth={5}
                >
                  {clicksByGender.map((entry) => (
                    <Cell key={entry.gender} fill={`var(--color-${entry.gender})`} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl sm:text-3xl font-bold">
                              {clicksByGender.reduce((a, b) => a + b.count, 0)}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs sm:text-sm">
                              Total Clicks
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 2-Column Grid for Platform Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Views by Platform */}
        <Card>
          <CardHeader>
            <CardTitle>Views by Platform</CardTitle>
            <CardDescription>Social platform breakdown of views</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={viewsByPlatform} dataKey="count" nameKey="platform" strokeWidth={5}>
                  {viewsByPlatform.map((entry) => (
                    <Cell key={entry.platform} fill={`var(--color-${entry.platform})`} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Clicks by Platform */}
        <Card>
          <CardHeader>
            <CardTitle>Clicks by Platform</CardTitle>
            <CardDescription>Social platform breakdown of clicks</CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={clicksByPlatform} dataKey="count" nameKey="platform" strokeWidth={5}>
                  {clicksByPlatform.map((entry) => (
                    <Cell key={entry.platform} fill={`var(--color-${entry.platform})`} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
