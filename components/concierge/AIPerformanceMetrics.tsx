import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricProps {
  label: string;
  value: number;
  trend?: number;
  suffix?: string;
}

const MetricRow = ({ label, value, trend, suffix = "%" }: MetricProps) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{value}{suffix}</span>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export const AIPerformanceMetrics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MetricRow label="Qualification Success Rate" value={78} trend={5} />
        <MetricRow label="Hand-Off Rate" value={23} trend={-2} />
        <MetricRow label="Conversion Rate" value={34} trend={8} />
      </CardContent>
    </Card>
  );
};
