import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { useSelector } from "react-redux";


const AuthLayout = () => {
  const location = useLocation();
  const UserData = useSelector((state) => state.UserState);
  const sessionid = Cookies.get("token") // Get all cookies as an object
  const {data:userdata,isError} = useGetUserQuery()
  const isQuizPath = location.pathname.startsWith("/quiz");
  console.log(UserData);
  // Allow access to quiz paths or require authentication for other paths
  return (isQuizPath || sessionid) && !isError ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};


export default AuthLayout;
