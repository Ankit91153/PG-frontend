// src/constants/dashboardCards.ts
import { Building2, DoorOpen, BedDouble, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react"; // ✅ this is the correct type
import type { DashboardSummary } from "../types/types";

export type DashboardCardConfig = {
    title: string;
    key: keyof DashboardSummary;
    icon: LucideIcon; 
  };



export const dashboardCardConfig: DashboardCardConfig[] = [
  {
    title: "Total Floors",
    key: "totalFloors",
    icon: Building2,
  },
  {
    title: "Total Rooms",
    key: "totalRooms",
    icon: DoorOpen,
  },
  {
    title: "Total Beds",
    key: "totalBeds",
    icon: BedDouble,
  },
  {
    title: "Total Tenants",
    key: "totalTenants",
    icon: Users,
  },
];
