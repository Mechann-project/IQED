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
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const userProgress = useSelector((state) => state.UserState?.CourseProgress);

  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const sectionFromUrl = new URLSearchParams(location.search).get("section");
    const sectionIndex = parseInt(sectionFromUrl, 10);

    if (!isNaN(sectionIndex) && userProgress?.levelProgress[sectionIndex]) {
      setSelectedSection(userProgress?.levelProgress[sectionIndex]);
    } else {
      setSelectedSection(null);
    }
  }, [location, Course]);

  const handleReturnToSections = () => {
    setSelectedSection(null);
    navigate("/missions");
  };
  const handleQuizCraetion = (
    levelid,
    lessonid,
    topicId,
    questionCount = 3
  ) => {
    try {
      console.log("quiz craeter",levelid, lessonid, topicId);
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({
          levelid,
          lessonid,
          topicId,
          questionCount: 20,
        }).unwrap(),
        {
          loading: "Creating Session...",
          success: (res) => {
            sessionStorage.setItem("QuizSessionID", res.sessionId);
            navigate(`/quiz/${res.sessionId}`, { replace: true });
            return "Session Created Successfully!";
          },
          error: (e) => {
            console.error(e);
            return "Failed to create session. Please try again.";
          },
        }
      );
    } catch (error) {
      console.error("Failed to update quiz session:", error);
      toast.error("sorry session not save");
    }
  };
  const breadcrumbPath = useMemo(() => {
    if (selectedSection) {
      return [
        { label: "Missions", to: null, onClick: handleReturnToSections },
        { label: `${selectedSection.level.name}`, to: null },
      ];
    }
    return [{ label: "Missions", to: null }];
  }, [selectedSection]);

  const handleSelectSection = (index) => {
    navigate(`/missions?section=${index}`);
  };



  if (coursesLoading || userLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        ml: isSm ? "10px" : "20px",
        mr: isSm ? null : "20px",
        mt: isSm ? "10px" : "20px",
        mb: isSm ? "50px" : "20px",
        pr: isSm ? "10px" : null,
        gap: "20px",
        overflow: "hidden",
      }}
    >
      <BreadcrumbsNav paths={breadcrumbPath} />
      <Box
        sx={{
          p: "10px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "20px",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {!selectedSection ? (
          userProgress?.levelProgress.map((level, index) => (
            <Grid item xs={12} lg={12} key={level._id}>
              <LevelCard
                level={{
                  level: level?.level.levelNumber +1,
                  total: level?.lessonProgress?.length || 0,
                  progress:  level.lessonProgress.filter(lesson => lesson.completed).length, 
                  image: trophy,
                  name: level?.level.name,
                  description: level?.level.description,
                }}
                examUnlocked={level.finalExamUnlocked}
                active={level.unlocked}
                onSelect={() => handleSelectSection(index)}
              />
            </Grid>
          ))
        ) : (
          <Suspense fallback={<LoadingScreen />}>
            <Grid item xs={12} lg={12}>
              <LevelDetails section={selectedSection} />
            </Grid>
          </Suspense>
        )}
      </Box>
    </Box>
  );
};

export default MissionPage;
