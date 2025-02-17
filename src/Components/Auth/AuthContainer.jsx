import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Box, Paper, Stack } from "@mui/material";
import CarouselBox from "./SubComponets/CarouselBox";
import SignInBox from "./SubComponets/SignInBox";
import SignUpBox from "./SubComponets/SignUpBox";
import { Logo } from "../../Common";

const AuthContainer = () => {
  const [isLoginPage, setisLoginPage] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handelPageSwitch = () => {
    setisLoginPage(!isLoginPage);
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the desired path
  };

  return (
    <Paper
      component="main"
      sx={{
        backgroundColor: "#FFFFFF",
        height: { xs: "80vh", md: "80vh" },
        width: { xs: "80vw", md: "70vw" },
        borderRadius: { xs: "8px", md: "16px" },
        p: 2,
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", cursor: "pointer" }} onClick={handleLogoClick}>
        <Logo />
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          height: "100%",
          overflow: "hidden",
          backgroundSize: "cover",
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoginPage ? (
          <SignInBox PageSwitch={handelPageSwitch} />
        ) : (
          <SignUpBox PageSwitch={handelPageSwitch} />
        )}
        <CarouselBox />
      </Stack>
    </Paper>
  );
};

export default AuthContainer;
