import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { useNavigate } from "react-router-dom";

const StoreOrderLayout = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleBack = () => navigate("/store");
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
       
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          gap: isSm ? "10px" : "20px",
          bgcolor: "#1A49BA",
          boxSizing: "border-box",
          p: "12px",
          borderRadius: "10px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "20px",
          }}
        >
          <IconButton
            aria-label="back"
            onClick={handleBack}
            sx={{
              p: 0,
              color: "white",
              "&:hover": {
                color: "#FFDA55",
              },
            }}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Typography
            variant={{ lg: "h6", sm: "body1", xs: "body1" }}
            sx={{
              color: "White",
              fontWeight: "bold",
            }}
          >
            Continue shopping at the IQED Store
          </Typography>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
};

export default StoreOrderLayout;
