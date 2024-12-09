import React from "react";
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IQCoinIcon } from "../../assets";



const MPRewardCard = ({ title, leftText, coinValue }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#02216F",
        borderRadius: "15px",
        padding: "5px 20px",
        boxSizing:'border-box',
        width: "100%",
        // maxWidth: "200px",
        boxSizing: "border-box",
        mb: 2,
      }}
    >
      {/* Title Section */}
      <Typography
        // variant="body1"
        sx={{
          color: "#FFFFFF",
          fontWeight: "600",
          mb: 1,
          fontSize: '12px',
        }}
      >
        {title}
      </Typography>

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "10px",
          padding: "10px",
          width: "100%",
          boxSizing:'border-box',
        }}
      >
        {leftText && (
          <>
            <Typography
              
              sx={{
                fontWeight: "600",
                color: "#02216F",
                textAlign: "left",
                fontSize: '14px',
              }}
            >
              {leftText}
            </Typography>
            <Divider
              orientation="vertical"
              sx={{
                borderRightWidth: 2,
                bgcolor: "black",
                borderRadius: "50px",
              }}
            />
          </>
        )}
        {/* Right Side Coin + Value */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Box
            component="img"
            src={IQCoinIcon}
            alt="coin"
            sx={{
              width: isSm ? "10px" : "30px",
              height: isSm ? "10px" : "30px",
            }}
          />
          <Typography
          
            sx={{
              fontWeight: "600",
              color: "#02216F",
              textAlign: "right",
              fontSize: "12px",
            }}
          >
            +{coinValue}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MPRewardCard;
