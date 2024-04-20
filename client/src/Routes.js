import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomePage from "./AppPages/HomePage";
import Dashboard from "./AppPages/Dashboard";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </RouterRoutes>
  );
};

export default Routes;
