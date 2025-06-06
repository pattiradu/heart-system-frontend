import React from "react";
import { Route, Routes } from "react-router-dom";
import AllRoles from "../pages/roles/AllRoles";
import CreateRole from "../pages/roles/CreateRole";
import EditRole from "../pages/roles/EditRole";

function routes() {
  return (
    <Routes>
      {/* app routes */}
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
    </Routes>
  );
}

export default routes;
