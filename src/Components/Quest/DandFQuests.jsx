import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, Typography, Grid } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import QuestCard from "./QuestCard";
import { useSelector } from "react-redux";

const DandFQuests = ({ isSideBar }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const UserData = useSelector((state) => state.UserState);

  return (
    <Box width={"100%"}>
      {/* Daily Quests */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "10px",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Daily Quests
        </Typography>
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: "12px",
            color: "#1A49BA",
            cursor: "pointer",
            "&:hover": {
              color: "#0F3A8D",
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/Profile")} // Navigate to "/daily-quests"
        >
          View All
        </Typography>
      </Box>

      <Grid
        container
        padding={isSideBar ? "10px" : 0.5}
        direction={"column"}
        gap={2}
      >
        {UserData && (
          <>
            <Grid size={8}>
              <QuestCard
                isSideBar
                icon={<AcUnitIcon />}
                title={"XP Hunter"}
                About={`${UserData?.XPQuests?.targetValue} more XP to unlock +${UserData?.XPQuests?.rewardGem} IQGEMS!`}
                current={
                  UserData?.earnings?.xp - UserData?.XPQuests?.CurrentValue
                }
                goal={UserData?.XPQuests?.targetValue}
                reward={`+${UserData?.XPQuests?.rewardGem} IQGEMS`}
              />
            </Grid>
            <Grid size={8}>
              <QuestCard
                isSideBar
                icon={<WhatshotIcon />}
                title={"Streak Hunter"}
                About={`${UserData?.StreakQuest?.targetValue} more days to unlock +${UserData?.StreakQuest?.rewardGem} IQGEMS!`}
                current={UserData?.StreakQuest?.CurrentValue}
                goal={UserData?.StreakQuest?.targetValue}
                reward={`+${UserData?.StreakQuest?.rewardGem} IQGEMS`}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default DandFQuests;
