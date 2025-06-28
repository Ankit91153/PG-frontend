import { Card, CardContent } from "@/components/ui/card";
import type { DashboardCardConfig } from "../../../constants/dashboardCards";



const DashboardCard = ({ item }: { item: DashboardCardConfig & { count: number | string } }) => {
  const Icon = item.icon;

  return (
    <Card className="bg-card border border-border text-textPrimary">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="bg-muted p-3 rounded-full">
          <Icon className="w-6 h-6 text-primary" /> {/* ✅ render icon */}
        </div>
        <div>
          <p className="text-sm text-textSecondary">{item.title}</p>
          <p className="text-xl font-bold">{item.count}</p>
        </div>
      </CardContent>
    </Card>
  );
};


export default DashboardCard;


