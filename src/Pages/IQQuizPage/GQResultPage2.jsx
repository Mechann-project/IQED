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

import { Link, useNavigate } from "react-router-dom";
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

const CssTextField = withStyles({
  root: {
    "& label": {
      color: "#C6C6C6",
      fontWeight: "bold",
    },
    "& label.Mui-focused": {
      color: "#02216F",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#02216F",
      },
      "&:hover fieldset": {
        borderColor: "#1A49BA",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1A49BA",
      },
    },
  },
})(TextField);

const GQSuccessPage = () => {
  const location = useLocation();
  const IQQuizState = useSelector((state) => state.IQQuizState);
  // const { Score, totalTimeTaken } = location.state;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setName] = useState(sessionStorage.getItem("IQUserusername"));
  // const [contact, setContact] = useState(sessionStorage.getItem("IQUseremail"));
  const contact = "tech@iqed.in";

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

  const textFieldStyles = {
    borderRadius: 2,
    bgcolor: "#fff",
    fontWeight: "bold",
    color: "#02216F",
    boxShadow: "2px 3px #02216F",
  };

  useEffect(() => {
    const hash =
      selectedMethod === "email"
        ? "#GetViaEmail"
        : selectedMethod === "whatsapp"
        ? "#GetViaWhatsApp"
        : "";
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [selectedMethod]);

  //  await generateChart();
  //     const chartImage = canvasRef.current.toDataURL("image/png");
  const sendmail = async (name, score) => {
    // console.log(contact, name, IQQuizState.IQscore);

      const pdfBlob = await generateIqReport(name,IQQuizState,imageData);
      console.log(pdfBlob)
      if (pdfBlob) {
        // const downloadLink = document.createElement("a");
        // const pdfUrl = URL.createObjectURL(pdfBlob);
        // downloadLink.href = pdfUrl;
        // downloadLink.download = `${name}_IQ_Report.pdf`;
  
        // // Programmatically trigger the download
        // downloadLink.click();
  
        // // Optionally, revoke the object URL after the download to free up memory
        // URL.revokeObjectURL(pdfUrl);
        toast.promise(
          UploadFileMutation({
            blob: pdfBlob,
            email: contact,
            name: name,
            filename:`${name}_IQ_Report.pdf`,
            sessionId: sessionStorage.getItem("IQSessionID"),
          }),
          {
            loading: "Send...",
            success: () => {
              sessionStorage.clear();
              navigater("/",{ replace: true });
              return <b>Check Your Email..</b>;
            },
            error: <b>Could not Add Try again.</b>,
          }
        );
      }else {
            console.error("Failed to generate the PDF.");
      }
    // try {
  
    //     console.log("PDF generated and saved successfully.");
    //   } else {
    //     console.error("Failed to generate the PDF.");
    //   }

      // if (imageData) {
      //   const imageDownloadLink = document.createElement("a");
      //   imageDownloadLink.href = imageData; // Assuming `imageData` is a base64 data URL
      //   imageDownloadLink.download = `${name}_Chart_Image.png`;
  
      //   // Trigger PNG download
      //   imageDownloadLink.click();
      //   console.log("Image downloaded successfully.");
      // } else {
      //   console.error("No image data available for download.");
      // }


    // } catch (error) {
    //   console.error("Error generating PDF:", error);
    // }

    
  };

  const validateContact = (value) => {
    if (value.includes("@")) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    } else {
      // WhatsApp number validation (basic check for numeric input)
      return /^[0-9]{10,15}$/.test(value);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    if (!name.trim() || !validateContact(contact)) {
      setError(true);
    } else {
      setError(false);

      sendmail(name, IQQuizState.IQscore);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#GetViaEmail") {
        setSelectedMethod("email");
      } else if (window.location.hash === "#GetViaWhatsApp") {
        setSelectedMethod("whatsapp");
      } else {
        setSelectedMethod(null);
      }
    };

    // Initial check for hash on mount
    handleHashChange();

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  

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
                width: { md: "60%" },
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
              Congratulations on successfully completing the test! You may have
              created a record, check your results via EMAIL
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
