import LandingHeader from "../../Components/Landing/LandingHeader";
import { Box, useTheme, useMediaQuery, Typography, Stack, Divider } from "@mui/material";
import LaunchTimer from "./LaunchTimer";
import { launch } from "../../assets";

const LandingPage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate the time until tomorrow at 12:00 PM
  // const now = new Date();
  // const tomorrow = new Date();
  // tomorrow.setDate(now.getDate() + 1);
  // tomorrow.setHours(9, 0, 0, 0);
  // const initialTime = Math.floor((tomorrow - now) / 1000); // Time in seconds


  const now = new Date();
  const targetTime = new Date();
  targetTime.setHours(9, 0, 0, 0); // Set to 9:00 AM today

  // If it's already past 9:00 AM today, set it for 9:00 AM tomorrow
  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const initialTime = Math.floor((targetTime - now) / 1000);
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LandingHeader />
     
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxSizing: "border-box",
            p: isSm ? "15px" : null,
          }}
        >
          <Box
            width={"250px"}
            height={"250px"}
            component="img"
            alt="Pop"
            src={launch}
          />
          <Typography
            align="center"
            sx={{
              bgcolor: "#F7DE83",
              px: "15px",
              py: "5px",
              color: "#02216F",
              fontSize: { xs: "12px", md: "16px", lg: "16px", sm: "12px" },
              fontWeight: "bold",
              borderRadius: "20px",
              // mt: "3%",
            }}
          >
            🚀 Get Ready for Launch!
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              mb: "30px",
              mt: "30px",
              color: "#02216F",
              fontSize: { xs: "15px", md: "36px", lg: "36px", sm: "20px" },
              fontWeight: "bold",
              width: {
                lg: "60%",
                md: "60%",
                sm: "80%",
                xs: "90%",
              },
            }}
          >
             The <b>IQED Challenge Platform</b> is launching tomorrow. Be prepared to embark on an incredible journey of challenges, learning, and growth.
          </Typography>
          <Stack
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ borderRightWidth: 2 }}
              />
            }
            spacing={2}
            sx={{
              width: { md: "50%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Add progress bar  */}
            <LaunchTimer start={true} initialTime={initialTime} />


          </Stack>

         
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
