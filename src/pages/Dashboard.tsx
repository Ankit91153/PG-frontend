import { useQuery } from "@tanstack/react-query";
import DashboardCard from "../components/custom/dashboard/DashboardCard";
import { getDashboardSummary, getTenantDetails } from "../apis/api";
import { dashboardCardConfig } from "../constants/dashboardCards";
import TenantList from "../components/custom/dashboard/TenantList";

const Dashboard = () => {
  const { data: summaryData, isLoading: loadingSummary } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    refetchInterval: 5 * 60 * 1000,
  });

  const { data: tenantData, isLoading: loadingTenant } = useQuery({
    queryKey: ["dashboard-tenant-details"],
    queryFn: getTenantDetails,
    refetchInterval: 5 * 60 * 1000,
  });

  const summary = summaryData?.success ? summaryData.data : null;
  const tenants = tenantData?.success ? tenantData.data : [];

  console.log(tenants);
  

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCardConfig.map((item, index) => {
          const count = loadingSummary || !summary ? "..." : summary[item.key];

          return (
            <DashboardCard
              key={index}
              item={{
                ...item,
                count,
              }}
            />
          );
        })}
      </div>

      <TenantList tenants={tenants} isLoading={loadingTenant} />
    </div>
  );
};

export default Dashboard;