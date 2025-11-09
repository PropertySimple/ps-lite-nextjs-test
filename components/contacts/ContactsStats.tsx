
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const ContactsStats = () => {
  const stats = [
    {
      title: "Total Contacts",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "New This Month",
      value: "184",
      change: "+23%",
      changeType: "positive" as const,
    },
    {
      title: "Active Leads",
      value: "1,253",
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Conversion Rate",
      value: "24.3%",
      change: "-2%",
      changeType: "negative" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs lg:text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            {stat.changeType === 'positive' ? (
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-3 w-3 lg:h-4 lg:w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-lg lg:text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center gap-1 ${
              stat.changeType === 'positive' 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              <span>{stat.change}</span>
              <span className="text-muted-foreground">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactsStats;
