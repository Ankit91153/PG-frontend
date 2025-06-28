import React, { useEffect, useState } from "react";
import { sidebarLinks } from "@/constants/sidebarLinks";
import { useNavigate, useLocation } from "react-router-dom";
import type { sidebarLinksType } from "../../types/types";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  return (
    <aside className="fixed top-0 left-0 h-full bg-card border-r border-border flex flex-col justify-between p-4 w-[4.5rem] md:w-[15rem] transition-all">
      {/* Top Menu */}
      <div className="flex flex-col space-y-2">
        {sidebarLinks.map((item: sidebarLinksType) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
              ${
                isActive
                  ? "bg-primary text-white"
                  : "text-textPrimary hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:inline">{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Theme Toggle */}
      <div
        onClick={toggleTheme}
        className="cursor-pointer p-2 rounded-lg flex items-center justify-center hover:bg-muted"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        <span className="hidden md:inline ml-2 text-sm">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
