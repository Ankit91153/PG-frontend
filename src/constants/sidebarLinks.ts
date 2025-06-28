import { Home, Layers, BedDouble, DoorOpen, Users } from "lucide-react";
import type { sidebarLinksType } from "../types/types";

export const sidebarLinks: sidebarLinksType[] = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Floor", path: "/floor", icon: Layers },
  { name: "Room", path: "/room", icon: DoorOpen },
  { name: "Bed", path: "/bed", icon: BedDouble },
  { name: "Tenants", path: "/tenants", icon: Users },
];