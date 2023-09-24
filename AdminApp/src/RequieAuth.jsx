import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export default function RequieAuth({ children }) {
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  console.log(userId.length);

  return userId.length > 0 ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}
