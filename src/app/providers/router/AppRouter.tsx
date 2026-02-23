import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserPage } from "@/pages/login/ui/UserPage";
import { PrivateRoute } from "./PivateRoute";
import { NotFoundPage } from "@/pages/login/ui/NotFoundPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />

      <Route path="/login" element={<div>Login Page</div>} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
