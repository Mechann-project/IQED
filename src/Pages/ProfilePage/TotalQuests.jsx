import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Group, PersonAdd } from "@mui/icons-material/";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import QuestCard from "../../Components/Quest/QuestCard";
import { useSelector } from "react-redux";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WhatshotIcon from "@mui/icons-material/Whatshot";

const TotalQuests = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const UserData = useSelector((state) => state.UserState);
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box width={"100%"}>
      {/* Button-like Tabs Navigation */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          mb: 3,
          "& .MuiTab-root": {
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            bgcolor: "#3f51b5",
            mx: 1,
            my: 1,
            fontWeight: "bold",
            color: "#fff !important",
          },
          "& .Mui-selected": {
            border: "2px solid",
            borderColor: "#FFDA55",
            boxShadow: "2px 3px #FFDA55",
            bgcolor: "#1A237E",
            color: "#fff !important",
          },
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab label="XP Hunter" />
        <Tab label="Streak Hunter" />
        <Tab label="Achieved" />
      </Tabs>

      {/* Content for Daily Quests */}
      {selectedTab === 0 && (
        <Box>
          <Grid
            container
            direction={"row"}
            spacing={1}
            gap={1}
            padding={"20px"}
          >
            <Grid item xs={12} sm={12}>
              <QuestCard
                isSideBar
                icon={<AcUnitIcon />}
                title={"XP Hunter"}
                About={`You're on a ${
                  UserData?.earnings?.xp - UserData?.XPQuests?.CurrentValue
                } XP! Keep going for ${
                  UserData?.XPQuests?.targetValue
                } more XP to unlock +${
                  UserData?.XPQuests?.rewardGem
                } IQ GEMS! 💎`}
                current={
                  UserData?.earnings?.xp - UserData?.XPQuests?.CurrentValue
                }
                goal={UserData?.XPQuests?.targetValue}
                reward={`+${UserData?.XPQuests?.rewardGem} IQGEMS`}
              />
            </Grid>
            {[...Array(5)].map((_, index) => (
              <Grid item xs={12} sm={12}>
                <QuestCard
                  isSideBar
                  icon={<AcUnitIcon />}
                  title={
                    "XP Hunter " +
                    (UserData?.XPQuests?.targetValue +
                      (index + 1) * UserData?.XPQuests?.StepUpValue)
                  }
                  About={`LOCKED`}
                  current={0}
                  active={false}
                  goal={
                    UserData?.XPQuests?.targetValue +
                    (index + 1) * UserData?.XPQuests?.StepUpValue
                  }
                  reward={`+${
                    10 * (index + 1) + UserData?.XPQuests?.rewardGem
                  } IQGEMS`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          <Grid container spacing={2} padding={"20px"}>
            <Grid item xs={12} sm={12}>
              <QuestCard
                isSideBar
                icon={<AcUnitIcon />}
                title={"Streak Hunter"}
                About={`You're on a ${UserData?.StreakQuest?.CurrentValue}-day streak Keep going for ${UserData?.StreakQuest?.targetValue} more days to unlock +${UserData?.StreakQuest?.rewardGem} IQ GEMS! 💎`}
                current={UserData?.StreakQuest?.CurrentValue}
                goal={UserData?.StreakQuest?.targetValue}
                reward={`+${UserData?.StreakQuest?.rewardGem} IQGEMS`}
              />
            </Grid>
            {[...Array(5)].map((_, index) => (
              <Grid item xs={12} sm={12}>
                <QuestCard
                  isSideBar
                  icon={<AcUnitIcon />}
                  title={
                    "Streak Hunter " +
                    (UserData?.StreakQuest?.targetValue +
                      (index + 1) * UserData?.StreakQuest?.StepUpValue)
                  }
                  About={`LOCKED`}
                  current={0}
                  active={false}
                  goal={
                    UserData?.StreakQuest?.targetValue +
                    (index + 1) * UserData?.StreakQuest?.StepUpValue
                  }
                  reward={`+${
                    10 * (index + 1) + UserData?.StreakQuest?.rewardGem
                  } IQGEMS`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {selectedTab === 2 && (
        <Box>
          <Grid container spacing={2} padding={"20px"}>
            {[
              ...Array(
                Math.floor(
                  UserData?.StreakQuest?.targetValue /
                    UserData?.StreakQuest?.StepUpValue
                )
              ),
            ].map((_, index) => (
              <Grid item xs={12} sm={12}>
                <QuestCard
                  isSideBar
                  icon={<AcUnitIcon />}
                  title={"Streak Hunter"}
                  About={`COMPLETED`}
                  current={1 + index * UserData?.StreakQuest?.StepUpValue}
                  active={false}
                  goal={1 + index * UserData?.StreakQuest?.StepUpValue}
                  reward={`+${
                    10 + index * UserData?.StreakQuest?.rewardGem
                  } IQGEMS`}
                />
              </Grid>
            ))}
            {[
              ...Array(
                Math.floor(
                  UserData?.XPQuests?.targetValue /
                    UserData?.XPQuests?.StepUpValue
                )
              ),
            ].map((_, index) => (
              <Grid item xs={12} sm={12}>
                <QuestCard
                  isSideBar
                  icon={<AcUnitIcon />}
                  title={"XP Hunter"}
                  About={`COMPLETED`}
                  current={500 + index * UserData?.XPQuests?.StepUpValue}
                  active={false}
                  goal={500 + index * UserData?.XPQuests?.StepUpValue}
                  reward={`+${
                    10 * index + UserData?.XPQuests?.rewardGem
                  } IQGEMS`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TotalQuests;
