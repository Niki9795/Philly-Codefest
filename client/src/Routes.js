import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import HomePage from "./AppPages/HomePage";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
    </RouterRoutes>
  );
};

export default Routes;
