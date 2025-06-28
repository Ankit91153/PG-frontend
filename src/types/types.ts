import type { LucideIcon } from "lucide-react";

export type sidebarLinksType = {
  name: string;
  path: string;
  icon: LucideIcon;
};

export type DashboardSummary = {
  totalFloors: number;
  totalRooms: number;
  totalBeds: number;
  totalTenants: number;
};

export type Tenant = {
  name: string;
  phone: string;
  aadharNumber: string;
  documentUrl: string;
  floorNumber: number;
  roomNumber: string;
  bedNumber: string;
};
export type FloorData = {
  _id: string;
  floorNumber: number;
};
export type RoomData = {
  _id: string;
  roomNumber: string;
  floorId: FloorData;
  type: "1-sharing" | "2-sharing" | "3-sharing";
};
export type RoomUpdateData = {
  _id: string;
  roomNumber: string;
  type: "1-sharing" | "2-sharing" | "3-sharing";
};
