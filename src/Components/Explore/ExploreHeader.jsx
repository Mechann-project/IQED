import { Box, Typography,useMediaQuery,useTheme, } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CompetitiveExam from "./CompetitiveExam";

const ExploreHeader = () => {
   const theme = useTheme();
  const UserData = useSelector((state) => state.UserState);
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        // height: "15%",
        marginTop:'20px',
        mb:'20px',
        display: "block",
        alignItems: "center",
      }}
    >
      <Typography
        fontWeight={700}
        padding={0}
        lineHeight={1}
        sx={{
          fontSize: { xs: "20px", lg: "40px", md: "30px" },
          color:'#02216F'
        }}
      >
        Hello! {UserData.name.replace(/\b\w/g, (char) => char.toUpperCase())}
      </Typography> 
      <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            ml: isSm ? "10px" : null,
            mr: isSm ? "10px" : null,
            mt: isSm ? "10px" : "20px",
            mb: isSm ? "50px" : "20px",
            gap: "20px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {/* Competitive exam and quests sections */}
          <CompetitiveExam />
          {/* <DandFQuests /> */}
        </Box>
    </Box>
  );
};

export default ExploreHeader;
