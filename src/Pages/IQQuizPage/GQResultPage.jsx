import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  IconButton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConfettiEffect from "../QuizPage/ConfettiEffec";
import { popGIF, Poppins_Bold } from "../../assets";
import HomeIcon from '@mui/icons-material/Home';
import { Link, replace, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { withStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import { BellCurveChart, LandingHeader } from "../../Components";
import { useSelector } from "react-redux";
import { PDFDocument, rgb } from "pdf-lib";
import { IQTestResultTem1 } from "../../assets/PDF";
import * as fontkit from "fontkit";

import { useUploadFileMutation } from "../../Redux/API/IQ.Quiz.Api";
import toast from "react-hot-toast";
import { generateIqReport } from "./PDFGenerator";


const GQSuccessPage = () => {
  const location = useLocation();
  const IQQuizState = useSelector((state) => state.IQQuizState);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // const name = useState(sessionStorage.getItem("IQUserusername"));
  const [name, setName] = useState(sessionStorage.getItem("IQUserusername"));
  console.log("name",name);
  const contact = "tech@iqed.in";
  // const contact = "gowthamrajvp@gmail.com";

  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [UploadFileMutation] = useUploadFileMutation();
  const navigater = useNavigate();

  const handleChartRendered = (data) => {
    setImageData(data);
    console.log("imageData:", imageData);
  };
  console.log("QuizState.IQScore", IQQuizState);
  console.log("QuizState.score", IQQuizState.score);




  const sendmail = async (name, score) => {
    if (!imageData) {
      console.error("Image data is not available.");
      return;
    }
    setIsSendingEmail(true); // Disable the button
    try {
      const pdfBlob = await generateIqReport(name, IQQuizState, imageData);
      if (!pdfBlob) throw new Error("Failed to generate the PDF.");

      await toast.promise(
        UploadFileMutation({
          blob: pdfBlob,
          email: contact,
          name: name,
          filename: `${name}_IQ_Report.pdf`,
          sessionId: sessionStorage.getItem("IQSessionID"),
        }),
        {
          loading: "Submitting your result...",
          success: "Result submission successful.",
          error: "Failed to submit your result. Please try again.",
        }
      );
      sessionStorage.clear();
    } catch (error) {
      console.error("Error in sendmail:", error);
    } finally {
      sessionStorage.clear();
      setIsSendingEmail(false); 
    }
  };

  useEffect(() => {
    if (imageData) {
      sendmail(name, IQQuizState.IQscore);
    }
  }, [imageData]);



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: 0,
      }}
    >
      <ConfettiEffect />
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
            width={"200px"}
            height={"200px"}
            component="img"
            alt="Pop"
            src={popGIF}
          />
          <Typography
            align="center"
            sx={{
              bgcolor: "#F7DE83",
              px: "15px",
              py: "5px",
              color: "#02216F",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "20px",
              mt: "3%",
            }}
          >
            IQ Test Completed
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              pb: "30px",
              width: '60%',
              color: "#02216F",
              fontSize: { xs: "20px", md: "36px", lg: "36px", sm: "20px" },
              fontWeight: "bold",
              // width: {
              //   lg: "30%",
              //   md: "40%",
              //   sm: "70%",
              //   xs: "60%",
              // },
            }}
          >
            Congratulations on successfully completing the test!
            {/* You may have created a record, check your results via EMAIL */}
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
            <Button
              startIcon={<HomeIcon />}
              fullWidth
              variant="contained"
              onClick={() => navigater("/", { replace: true })}
              disabled={isSendingEmail} // Disable based on email status
              sx={{
                fontWeight: "bold",
                backgroundColor: isSendingEmail ? "#ccc" : "#1A49BA",
                color: "#fff",
                boxShadow: "2px 3px #fff",
                borderRadius: { xs: "5px", md: "8px" },
                textTransform: "none",
                width: { xs: "100%", lg: "30%" },
                border: "1px solid #fff",
                "&:hover": {
                  color: "#ffff",
                  backgroundColor: isSendingEmail ? "#ccc" : "black",
                  transition: "transform 0.3s ease-in-out",
                  transform: "translateY(-5px)",
                  boxShadow: "2px 3px #ffff",
                },
              }}
            >
              Go to Home
            </Button>


          </Stack>

          <BellCurveChart
            userIQ={IQQuizState.IQscore}
            // userIQ={83.13}
            onChartRendered={handleChartRendered}
            sx={{
              visibility: "hidden",
              zIndex: -999,
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GQSuccessPage;
