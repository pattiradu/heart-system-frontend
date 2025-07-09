import { Route, Routes } from "react-router-dom";
import AllRoles from "../pages/roles/AllRoles";
import CreateRole from "../pages/roles/CreateRole";
import EditRole from "../pages/roles/EditRole";
import AllUsers from "@/pages/users/AllUsers";
import DoctorHome from "@/pages/doctor/DoctorHome";
import Login from "../pages/Login";
import HealthAdvisorDashboard from "../pages/dashboard/HealthAdvisorDashboard";
import UserDashboard from "../pages/dashboard/UserDashboard";
import DashboardIndex from "@/pages/dashboard/DashboardIndex";

function routes() {
  return (
    <Routes>

      <Route path="/" element={<DashboardIndex />} />

      {/* roles routes */}
      <Route
        path="/roles"
        element={<AllRoles />}
      />
      <Route
        path="/role-create"
        element={<CreateRole />}
      />
      <Route
        path="/role-edit/:id"
        element={<EditRole />}
      />

      {/* USERS ROUTES */}
      <Route
        path="/users"
        element={<AllUsers />}
      />

      {/* doctors */}

      <Route
        path="/doctors"
        element={<DoctorHome />}
      />

      {/* login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* dashboard routes */}
      <Route
        path="/dashboard/health-advisor"
        element={<HealthAdvisorDashboard />}
      />
      <Route
        path="/dashboard/user"
        element={<UserDashboard />}
      />



      {/* page not found */}
      <Route
        path="*"
        element={<h1 className="text-center pt-12">404 - Not Found</h1>}
      />
    </Routes>
  );
}

export default routes;
