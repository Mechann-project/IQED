import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import QuestCard from "./QuestCard";
import { useSelector } from "react-redux";

const DandFQuests = ({ isSideBar }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const UserData = useSelector((state) => state.UserState);

  return (
    <Box width={'100%'}>
      {/* Daily Quests */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: "10px"
      }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Daily Quests
        </Typography>
        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: '12px',
            color: '#1A49BA',
            cursor: 'pointer',
            '&:hover': {
              color: '#0F3A8D',
              textDecoration: 'underline'
            }
          }}
          onClick={() => navigate('/Profile')} // Navigate to "/daily-quests"
        >
          View All
        </Typography>
      </Box>

      <Grid padding={isSideBar ? '10px' : "0 0 0 0"} sx={{ display: null }} lg={12}>
        <Grid item>
          {!UserData.valueBaseQuest.isCompleted && (
            <QuestCard
              isSideBar
              icon={<AdsClickIcon />}
              title={UserData?.valueBaseQuest?.Quest?.title}
              progress={UserData?.valueBaseQuest.progress}
              current={UserData?.valueBaseQuest.Quest?.params?.currentValue === "streak"
                ? UserData?.earnings[UserData?.valueBaseQuest.Quest?.params.currentValue].count
                : UserData?.earnings[UserData?.valueBaseQuest.Quest?.params.currentValue]}
              goal={UserData?.valueBaseQuest.Quest?.params?.targetValue}
              reward={`${UserData?.valueBaseQuest.Quest?.reward?.value} ${UserData?.valueBaseQuest.Quest?.reward?.type}`}
              About={UserData?.valueBaseQuest.Quest?.description}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DandFQuests;
