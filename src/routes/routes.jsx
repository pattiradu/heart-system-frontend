import React from "react";
import { Route, Routes } from "react-router-dom";
import AllRoles from "../pages/roles/AllRoles";
import CreateRole from "../pages/roles/CreateRole";
import EditRole from "../pages/roles/EditRole";
import AllUsers from "@/pages/users/AllUsers";
import DoctorHome from "@/pages/doctor/DoctorHome";

function routes() {
  return (
    <Routes>
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
    </Routes>
  );
}

export default routes;
