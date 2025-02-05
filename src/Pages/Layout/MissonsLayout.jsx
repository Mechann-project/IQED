import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../Redux/API/Career.Api";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import BreadcrumbsNav from "../MissionPage/BreadcrumbsNav";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../Redux/API/User.Api";

const MissonsLayout = () => {
  const { data: userdata, isSuccess } = useGetUserQuery();
  const userProgress = useSelector((state) => state.UserState?.CourseProgress);
  const { sectionIndex } = useParams();
  console.log(sectionIndex);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleReturnToSections = () => {
    navigate("/missions");
  };
  const breadcrumbPath = useMemo(() => {
    if (sectionIndex  && userProgress) {
      return [
        { label: "Missions", to: null, onClick: handleReturnToSections },
        {
          label: `${userProgress?.levelProgress[sectionIndex]?.level?.name}`,
          to: null,
        },
      ];
    }
    return [{ label: "Missions", to: null }];
  }, [userProgress]);
  return (
    <>
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
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <BreadcrumbsNav paths={breadcrumbPath} />

        {isSuccess && <Outlet />}
      </Box>
    </>
  );
};

export default MissonsLayout;
