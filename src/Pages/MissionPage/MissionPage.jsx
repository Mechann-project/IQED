import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import LevelCard from "./Levelcard";
import BreadcrumbsNav from "./BreadcrumbsNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../../Redux/API/Career.Api";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { LoadingScreen } from "../../Components";
import trophy from "./trophy.png";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";

const LevelDetails = lazy(() => import("./LevelDetails"));

const MissionPage = () => {
  const { data: Course, isLoading: coursesLoading } = useGetCoursesQuery();
  const { data: userData, isLoading: userLoading } = useGetUserQuery();

  const navigate = useNavigate();
  const userProgress = useSelector((state) => state.UserState?.CourseProgress);

  const handleSelectSection = (index) => {
    console.log("index,,",index)
    navigate(`/missions/${index}`);
  };

  if (coursesLoading || userLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "20px",
          scrollbarWidth: "none",
        }}
      >
        {userProgress?.levelProgress.map((level, index) => (
          <Grid item xs={12} lg={12} key={level._id}>
            <LevelCard
              Index= {index+1}
              level={{
                
                level: level?.level.levelNumber + 1,
                total: level?.lessonProgress?.length || 0,
                progress: level.lessonProgress.filter(
                  (lesson) => lesson.completed
                ).length,
                image: trophy,
                name: level?.level.name,
                description: level?.level.description,
                _id:level?.level?._id
              }}
              examUnlocked={level.finalExamUnlocked}
              active={level.unlocked}
              onSelect={() => handleSelectSection(index)}
            />
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default MissionPage;
