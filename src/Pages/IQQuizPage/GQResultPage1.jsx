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

const GQResultPage1 = () => {
  const location = useLocation();
  const IQQuizState = useSelector((state) => state.IQQuizState);
  // const { Score, totalTimeTaken } = location.state;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // const [name, setName] = useState(sessionStorage.getItem("IQUserusername"));
  // const [contact, setContact] = useState(sessionStorage.getItem("IQUseremail"));
  const [name, setName] = useState();
  const [contact, setContact] = useState();

  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [UploadFileMutation] = useUploadFileMutation();
  const navigate = useNavigate();

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
    if (!imageData) {
      console.error("Image data is not available.");
      return;
    }
  
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
        }).then(() => {
          sessionStorage.clear();
          navigate("/Auth");
        }),
        {
          loading: "Submitting your result...",
          success: "Result submission successful. Check your email!",
          error: "Failed to submit your result. Please try again.",
        }
      );
    } catch (error) {
      console.error("Error in sendmail:", error);
    }
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

  const renderForm = () => (
    <Box
      sx={{
        width: { sx: "30%", md: "30%" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          sx={{ color: "#02216F" }}
          onClick={() => setSelectedMethod(null)}
        >
          <ArrowCircleLeftIcon fontSize="inherit" />
        </IconButton>
        <Typography
          sx={{
            color: "#02216F",
            fontSize: { xs: "24px", md: "28px" },
            fontWeight: "bold",
          }}
        >
          Get result via {selectedMethod === "email" ? "Email" : "WhatsApp"}:
        </Typography>
      </Stack>
      <CssTextField
        id="name-field"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error && !name.trim()}
        // helperText={error && !name.trim() ? "Name is required" : ""}
        required
        InputProps={{
          sx: textFieldStyles,
        }}
      />
      <CssTextField
        id="contact-field"
        label={selectedMethod === "email" ? "Email" : "WhatsApp No"}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        error={error && !validateContact(contact)}
        // helperText={
        //   error && !validateContact(contact)
        //     ? "Enter a valid email or WhatsApp number"
        //     : ""
        // }
        required
        InputProps={{
          sx: { ...textFieldStyles },
        }}
      />
      <Button
        fullWidth
        variant="contained"
        required
        onClick={handleSendClick}
        sx={{
          fontWeight: "bold",
          backgroundColor: "#1A49BA",
          color: "#fff",
          boxShadow: "2px 3px #fff",
          borderRadius: { xs: "5px", md: "8px" },
          p: "10px",
          textTransform: "none",
          border: "1px solid #fff",
          "&:hover": {
            backgroundColor: "#02216F",
            transform: "translateY(-5px)",
            transition: "transform 0.3s ease-in-out",
            boxShadow: "2px 3px #fff",
          },
        }}
      >
        Send
      </Button>
    </Box>
  );

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
        {selectedMethod ? (
          renderForm()
        ) : (
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
            {/* <Typography
              sx={{
                textAlign: "center",
                width: { md: "60%",xs:"70%" },
                color: "#02216F",
                fontSize: {xs:"15px"},
                fontWeight: "bold",
                pb: "20px",
              }}
            >
              You can view your results via
            </Typography> */}

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
              <Button
                startIcon={<EmailIcon />}
                fullWidth
                variant="contained"
                onClick={() => setSelectedMethod("email")}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#1A49BA",
                  color: "#fff",
                  boxShadow: "2px 3px #fff",
                  borderRadius: { xs: "5px", md: "8px" },
                  textTransform: "none",
                  width: { xs: "100%", lg: "30%" },
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#ffff",
                    backgroundColor: "black",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #ffff",
                  },
                }}
              >
                Email
              </Button>
              {/* <Button
                startIcon={<WhatsAppIcon />}
                fullWidth
                variant="contained"
                onClick={() => setSelectedMethod("whatsapp")}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#00A259",
                  color: "#fff",
                  boxShadow: "2px 3px #fff",
                  borderRadius: { xs: "5px", md: "8px" },
                  textTransform: "none",
                  border: "1px solid #fff",
                  "&:hover": {
                    color: "#ffff",
                    backgroundColor: "#004B2A",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #ffff",
                  },
                }}
              >
                WhatsApp
              </Button> */}
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

            {/* <Typography
                sx={{
                  textAlign: "center",
                  width: { md: "60%" },
                  color: "#02216F",
                  fontSize: "16px",
                  fontWeight: "400",
                  py: "20px",
                }}
              >
                or directly on the platform
              </Typography>
              <Button
                component={Link}
                to="/Signup"
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  color: "#02216F",
                  boxShadow: "2px 3px #02216F",
                  borderRadius: { xs: "5px", sm: "5px", md: "8px", lg: "8px" },
                  width: "50%",
                  textTransform: "none",
                  border: "1px solid",
                  borderColor: "#02216F",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#02216F",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #02216F",
                  },
                }}
              >
                SignUp
              </Button> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GQResultPage1;
