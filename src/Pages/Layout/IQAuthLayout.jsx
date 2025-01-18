import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { useSelector } from "react-redux";



const IQAuthLayout = () => {
  const location = useLocation();
  return sessionStorage.getItem("IQUser") ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default IQAuthLayout;
