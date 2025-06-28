import { Routes, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Floor from "../pages/Floor";
import Room from "../pages/Room";
import Bed from "../pages/Bed";
import Tenants from "../pages/Tenants";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/floor" element={<Floor />} />
        <Route path="/room" element={<Room />} />
        <Route path="/bed" element={<Bed />} />
        <Route path="/tenants" element={<Tenants />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
