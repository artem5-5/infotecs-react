import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "@/pages/login/ui/UsersPage";
import { PrivateRoute } from "./PivateRoute";
import { NotFoundPage } from "@/pages/login/ui/NotFoundPage";
import { LoginPage } from "@/pages/login/ui/LoginPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
