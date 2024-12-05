import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { VS } from "../../assets";
import { useSelector } from "react-redux";

const VSCard = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const GameData = useSelector((state) => state.GameState);
  return (
   
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        position: "fixed",
        top: { lg: "5%", md: "2%", xs: "2%", sm: "2%" },
        right: "50%",
        transform: "translateX(50%)",
        width: { lg: "40%", md: "80%", xs: "80%", sm: "90%" },
        backgroundColor: "#FFDA55",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "2px 3px white",
        overflow: "visible",
      }}
    >
      {/* Left Name */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#333",
          flex: 1,
          textAlign: "left",
          fontSize: { lg: "18px", xs: "12px", sm: "12px" },
        }}
      >
        {GameData?.Players[0]?.Name}
      </Typography>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "none",
          mx: 2,
        }}
      >
        <Box
          component="img"
          src={VS}
          alt="VS"
          sx={{
            position: "absolute",
            width: { lg: "100px", xs: "60px", sm: "60px" },
          }}
        />
      </Box>

      <Typography
        sx={{
          fontWeight: "bold",
          color: "#333",
          flex: 1,
          textAlign: "right",
          fontSize: { lg: "18px", xs: "12px", sm: "12px" },
        }}
      >
       {GameData?.Players[1]?.Name}
      </Typography>
    </Box>
  );
};

export default VSCard;
