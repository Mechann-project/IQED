import React, { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Levelcard from "./Levelcard";
import LevelDetails from "./LevelDetails";
import BreadcrumbsNav from "./BreadcrumbsNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../../Redux/API/Career.Api";
import trophy from "./trophy.png"
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { LoadingScreen } from "../../Components";
const MissionPage = () => {
  const { data: Course, isLoading } = useGetCoursesQuery();
  const { data: userdata, isLoading: UserLoad } = useGetUserQuery()
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.UserState);
  const [selectedSection, setSelectedSection] = useState(null);
  console.log(UserData.CourseProgress)
  // Update selected section based on URL parameter
  useEffect(() => {
    const sectionFromUrl = new URLSearchParams(location.search).get("section");
    if (sectionFromUrl && Course) {

      setSelectedSection(Course.units[0] || null); // Reset to null if section not found
    } else {
      setSelectedSection(null); // Reset to null if no section in URL
    }
  }, [location, Course]);
  console.log(Course?.units[0]?.lessons[0]?.topics[0]);

  // Breadcrumb paths
  const breadcrumbPath = selectedSection
    ? [
      { label: "Missions", to: null, onClick: () => handleReturnToSections() },
      { label: `${selectedSection.name}`, to: null },
    ]
    : [{ label: "Missions", to: null }];

  // Handler to select a section
  const handleSelectSection = (index) => {
    navigate(`/missions?section=${index}`); // Update URL with selected section
  };

  // Handler to return to sections
  const handleReturnToSections = () => {
    setSelectedSection(null);
    navigate("/missions"); // Navigate back to sections
  };

  if (isLoading) {
    return <LoadingScreen />; // Add a loading indicator
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
      {/* Breadcrumb */}
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
        {!selectedSection && !UserLoad ? (
          Course?.units.map((lesson, index) => (
            <Grid item xs={12} lg={12} key={lesson._id}>
              <Levelcard
                level={{
                  level: index,
                  total: lesson?.lessons?.length,
                  progress: (UserData.CourseProgress?.currentLesson / lesson?.lessons?.length) / 100, // Update based on your logic
                  image: trophy, // Placeholder for an image // Add logic for active/inactive sections
                  description: lesson?.name,
                }}
                active={index <= UserData.CourseProgress.currentUnit}
                onSelect={() => handleSelectSection(index)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} lg={12} >
            <LevelDetails />
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MissionPage;