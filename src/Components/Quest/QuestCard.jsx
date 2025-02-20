import { Avatar, Box, Card, LinearProgress, Typography } from "@mui/material";
import React from "react";


const QuestCard = ({ icon, title,current, goal, reward, About,active=true }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "2px 3px #02216F",
        borderRadius: "10px",
        border: "2px solid",
        borderColor: "#02216F",
        filter: active ? "none" : "grayscale(100%)",
      }}
    >
      <Avatar sx={{ backgroundColor: "#FF7324" }}>{icon}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap:2
          }}
        >

          <Typography  fontWeight="900" sx={{
            fontSize: {
              xs: "10px", 
              sm: "10px", 
              md: "10px", 
              lg: "12px", 
            }
          }}>
            {title}
          </Typography>
       

          <Typography  fontWeight="900" color="Black" sx={{
            fontSize: {
              xs: "10px", 
              sm: "10px", 
              md: "10px", 
              lg: "12px", 
            }
          }}>
            {reward}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={(current / goal) * 100}
            sx={{
              height: 10,
              borderRadius: 10,
              marginY: 1,
              width: "100%",
              backgroundColor: "#02216F",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FFDA55",
              },
            }}
          />
          <Typography variant="body2" color="textSecondary">
            {current}/{goal}
          </Typography>
        </Box>
        <Typography variant="" fontSize={11} fontWeight="400" color="Black">
          {About}
        </Typography>
      </Box>
    </Card>
  );
};

export default QuestCard;
