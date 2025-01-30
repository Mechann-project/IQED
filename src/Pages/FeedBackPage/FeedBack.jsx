import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Icon for success
import { feedback } from "../../assets";
import toast from "react-hot-toast";
import { usePostFeedbackMutation } from "../../Redux/API/Feedback.Api";

const FeedBack = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [submitFeedback, { isLoading, isSuccess, error }] =
    usePostFeedbackMutation();

  // Form State
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [screenshots, setScreenshots] = useState([]);

  // Error State
  const [errors, setErrors] = useState({
    feedbackType: false,
    feedbackText: false,
  });

  // Handle file upload for screenshots
  const handleFileUpload = (event) => {
    const files = event.target.files;
    let updatedScreenshots = [...screenshots];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.size < 2 * 1024 * 1024) {
        if (updatedScreenshots.length < 3) {
          updatedScreenshots.push(file);
        } else {
          toast.error("You can upload a maximum of 3 screenshots.");
          break;
        }
      } else {
        toast.error("File size should be below 2MB");
      }
    }

    setScreenshots(updatedScreenshots);
  };

  // Form validation and submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ feedbackType: false, feedbackText: false });

    // Validate fields
    if (!feedbackType || !feedbackText || feedbackText.length < 50) {
      setErrors({
        feedbackType: !feedbackType,
        feedbackText: !feedbackText || feedbackText.length < 50,
      });
      toast.error("Please fill all required fields correctly.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
  
    formData.append("type", feedbackType);
    formData.append("feedback", feedbackText);

    if (feedbackType === "bug" && screenshots.length > 0) {
      screenshots.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
     
      const response = await submitFeedback(formData).unwrap();

      toast.success("Feedback submitted successfully!");
      setFeedbackType("");
      setFeedbackText("");
      setScreenshots([]);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit feedback.");
    } 
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isSm ? "10px" : "20px",
          bgcolor: "#1A49BA",
          p: "20px",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant={isSm ? "h6" : "h4"}
          sx={{
            color: "White",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Submit Your Feedback!
        </Typography>
        <Typography sx={{ fontSize: "12px", color: "White", fontWeight: 400 }}>
          Help us improve by sharing your feedback. Earn **100 IQ Coins** for
          each valid bug reported!
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: "20px",
          bgcolor: "#F3F7FF",
          borderRadius: "10px",
          border: "2px solid #02216F",
          boxShadow: "2px 3px #02216F",
          mb: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img
            src={feedback}
            alt="Ai_Icon"
            style={{ width: isSm ? "10%" : "5%", height: "auto" }}
          />
          We'd love to hear from you!
        </Typography>

        <TextField
          select
          label="Feedback Type"
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.feedbackType}
          helperText={
            errors.feedbackType ? "Please select a feedback type" : ""
          }
        >
          <MenuItem value="">
            <em>Select Feedback Type</em>
          </MenuItem>
          <MenuItem value="bug">Bug Report</MenuItem>
          <MenuItem value="general">General Suggestion</MenuItem>
        </TextField>

        <TextField
          label="Your Feedback (Minimum 50 characters)"
          multiline
          rows={6}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          variant="outlined"
          fullWidth
          error={errors.feedbackText}
          helperText={
            errors.feedbackText ? "Feedback must be at least 50 characters" : ""
          }
        />

        {feedbackType === "bug" && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Screenshot (Max 2MB each, up to 3 screenshots)
              <input type="file" hidden multiple onChange={handleFileUpload} />
            </Button>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              {screenshots.map((screenshot, index) => (
                <Typography key={index}>{screenshot.name}</Typography>
              ))}
            </Box>
          </Box>
        )}

        <Button
          variant="contained"
          color={isSuccess ? "success" : "primary"}
          onClick={handleSubmit}
          disabled={isLoading || isSuccess}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            color: "#ffffff",
            boxShadow: "2px 3px #FFDA55",
          }}
          startIcon={
            isLoading ? (
              <CircularProgress size={20} />
            ) : isSuccess ? (
              <CheckCircle sx={{ color: "green" }} />
            ) : null
          }
        >
          {isLoading
            ? "Submitting..."
            : isSuccess
            ? "Feedback Submitted!"
            : "Submit Feedback"}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedBack;
