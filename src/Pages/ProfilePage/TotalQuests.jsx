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
        <Tab label="Quests" />
        <Tab label="Friends Quests" />
        <Tab label="Achievements" />
      </Tabs>

      {/* Content for Daily Quests */}
      {selectedTab === 0 && (
        <Box>
          <Grid container spacing={2} padding={"20px"}>
            <Grid item xs={12} sm={6}>
              {!UserData.valueBaseQuest.isCompleted && (
                <QuestCard
                  icon={<AdsClickIcon />}
                  title={UserData?.valueBaseQuest?.Quest?.title}
                  progress={UserData?.valueBaseQuest.progress}
                  current={
                    UserData?.valueBaseQuest.Quest?.params.currentValue ==
                    "streak"
                      ? UserData?.earnings[
                          UserData?.valueBaseQuest.Quest?.params.currentValue
                        ].count
                      : UserData?.earnings[
                          UserData?.valueBaseQuest.Quest?.params.currentValue
                        ]
                  }
                  goal={UserData?.valueBaseQuest.Quest?.params?.targetValue}
                  reward={
                    UserData?.valueBaseQuest.Quest?.reward?.value +
                    " " +
                    UserData?.valueBaseQuest.Quest?.reward?.type
                  }
                  About={UserData?.valueBaseQuest.Quest?.description}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      )}

    
      {selectedTab === 2 && (
        <Box>
          <Grid container spacing={2} padding={"20px"}>
            {UserData?.AchivedQuest?.map((quest, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <QuestCard
                  icon={<Group />}
                  title={quest.title}
                  progress={100}
                  goal={100}
                  reward={100}
                  active={false}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

    
      {selectedTab === 1 && (
        <Box>
          <Grid container spacing={2} padding={"20px"}>
            <Grid item xs={12} sm={6}>
              <QuestCard
                icon={<Group />}
                title="Sage"
                progress={2}
                goal={10}
                reward={100}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <QuestCard
                icon={<PersonAdd />}
                title="Complete in time"
                progress={0}
                goal={3}
                reward={300}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default TotalQuests;
