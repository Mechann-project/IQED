import React from "react";
import { useSelector } from "react-redux";
import { Backdrop, CircularProgress } from "@mui/material";
import { UserApi } from "../../Redux/API/User.Api";

const Loading = () => {
  // Check if any API request is in a loading state
  const isLoading = useSelector((state) =>
    Object.values(state[UserApi.reducerPath].queries).some(
      (query) => query?.status === "pending"
    )
  );

  return (
    <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: 1301 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
