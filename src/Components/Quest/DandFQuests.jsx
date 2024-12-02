import React from "react";
import {
  Box,
  Card,
  Typography,
  LinearProgress,
  Grid,
  Avatar,
} from "@mui/material";
import { Group, PersonAdd } from "@mui/icons-material/";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import  QuestCard  from "./QuestCard";
import { useSelector } from "react-redux";
const DandFQuests = () => {
  const UserData = useSelector((state) => state.UserState);
  return (
    <Box width={'100%'}>
      {/* Daily Quests */}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Quests
      </Typography>
      <Grid container spacing={2} padding={'20px'}>
        <Grid item xs={12} sm={6}>
          {!UserData.valueBaseQuest.isCompleted && <QuestCard 
            icon={<AdsClickIcon />}
            title={UserData?.valueBaseQuest?.Quest?.title}
            progress={UserData?.valueBaseQuest.progress}
            current={UserData?.valueBaseQuest.Quest?.params?.currentValue=="streak"? UserData?.earnings[UserData?.valueBaseQuest.Quest?.params.currentValue].count:UserData?.earnings[UserData?.valueBaseQuest.Quest?.params.currentValue]}
            goal={UserData?.valueBaseQuest.Quest?.params?.targetValue}
            reward={UserData?.valueBaseQuest.Quest?.reward?.value + ' ' + UserData?.valueBaseQuest.Quest?.reward?.type}
            About={UserData?.valueBaseQuest.Quest?.description}
          />}
        </Grid>
      </Grid>

      {/* Friends Quests */}
      {/* <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        
      >
        Friends Quests
      </Typography>
      <Grid container spacing={2} padding={'20px'}>
        <Grid item xs={12} sm={6}>
          <QuestCard
            icon={<Group />}
            title="Challenge Your Friends"
            progress={2}
            goal={10}
            reward={100}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <QuestCard
            icon={<PersonAdd />}
            title="Invite 3 Friends"
            progress={0}
            goal={3}
            reward={300}
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default DandFQuests;
