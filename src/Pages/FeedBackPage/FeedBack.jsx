import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Autocomplete,
  styled,
  Divider
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Icon for success
import { feedback } from "../../assets";
import toast from "react-hot-toast";
import { usePostFeedbackMutation } from "../../Redux/API/Feedback.Api";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import OptionBox from "./OptionBox";
import { useAddXPMutation } from "../../Redux/API/User.Api";
import { UpdateUser } from "../../Redux/Slice/UserSlice/UserSlice";



const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  flexBasis: "80%",
  flexShrink: 0,
  fontWeight: 'bold',

}));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const Sidebar = styled("div")(() => ({
  width: "25%",
  paddingRight: "16px",
  maxHeight: "calc(100vh - 60px)",
  overflowY: "auto",
  position: "sticky",
  top: "0",
}));

const MainContent = styled("div")(() => ({
  width: "75%",
  padding: "16px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  maxHeight: "calc(100vh - 60px)",
  overflowY: "auto",
}));

const EditorContiner = styled("div")(() => ({
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  marginBottom: "16px",
  overflow: 'hidden'
}));
const TopicBox = styled("div")(() => ({
  // border: "1px solid #e0e0e0",
  paddingLeft: "10px",
  marginBottom: "16px",
  overflow: 'hidden'
}));



const SecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  color: theme.palette.text.secondary,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const TitleBar = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: " 10px 15px 10px 15px",
  backgroundColor: '#007bff20'
}));
const ContentBox = styled("div")(() => ({

  alignItems: "center",
  padding: "15px",
}));

const ContentHeader = styled("h3")(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: "600",
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: "8px",
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  margin: "10px 0 10px 0",
  "& .MuiOutlinedInput-root": {
    // height: "40px", 
    fontWeight: "600",
    "& input": {
      height: "40",
      padding: "8px",
      "&::placeholder": {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
}));



const FeedBack = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [submitFeedback, { isLoading, isSuccess, error }] =
  usePostFeedbackMutation();
  const [updateUserXP] = useAddXPMutation();

  // Form State
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ]);
  const [correctOption, setCorrectOption] = useState(null);
  const [explanation, setExplanation] = useState("");
  console.log("question", question)
  // Error State
  const [errors, setErrors] = useState({
    feedbackType: false,
    feedbackText: false,
    topic: false,
    question: false,
    options: false,
    correctOption: false,
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
    let newErrors = { ...errors };

    if (!feedbackType) {
      newErrors.feedbackType = true;
      toast.error("Please select a feedback type.");
    } else {
      newErrors.feedbackType = false;
    }

    if (feedbackType === "suggestQuestions") {
      newErrors.topic = !topic;
      newErrors.question = !question.trim();
      newErrors.options = options.some((opt) => !opt.text.trim());
      newErrors.correctOption = !correctOption;

      if (newErrors.topic || newErrors.question || newErrors.options || newErrors.correctOption) {
        toast.error("Please fill in all required fields for the question.");
        setErrors(newErrors);
        return;
      }
    } else if (!feedbackText || feedbackText.length < 50) {
      newErrors.feedbackText = true;
      toast.error("Your feedback must be at least 50 characters.");
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);

    const formData = new FormData();
    formData.append("type", feedbackType);

    if (feedbackType === "suggestQuestions") {
      formData.append("topic", topic);
      formData.append("question", question);
      formData.append("options", JSON.stringify(options));
      formData.append("correctOption", correctOption);
      formData.append("explanation", explanation);
    } else {
      formData.append("feedback", feedbackText);
      screenshots.forEach((image) => formData.append("images", image));
    }

    try {
      await submitFeedback(formData).unwrap();
      toast.success("Feedback submitted successfully!");
      updateUserXP({ xp: 100}).then(() => {
        dispatch(UpdateUser(userData));
      });
      setFeedbackType("");
      setFeedbackText("");
      setScreenshots([]);
      setTopic("");
      setQuestion("");
      setOptions([{ text: "" }, { text: "" }, { text: "" }, { text: "" }]);
      setCorrectOption(null);
      setExplanation("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit feedback.");
    }
  };

  useEffect(() => {
    return () => {
      screenshots.forEach((file) => URL.revokeObjectURL(file));
    };
  }, [screenshots]);


  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        // flexGrow: 0,
        gap: "20px",
        boxSizing: "border-box",
        overflow: "hidden",

      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: isSm ? "10px" : "20px",
          flexGrow: 0,
          bgcolor: "#1A49BA",
          p: "20px",
          boxSizing: "border-box",
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
          flexGrow: 1,
          fontFamily: "Poppins",
          border: "2px solid #02216F",
          boxShadow: "2px 3px #02216F",
          mb: "10px",
          mr: "10px",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            boxSizing: "border-box",
            px: "10px",
            py: "5px",
            borderRadius: "5px",
            fontSize: "18px",
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: "10px"
        }}>
          <CustomTextField
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
            <MenuItem value="suggestQuestions">Suggest Questions</MenuItem>
          </CustomTextField>

        </Box>
        <Box sx={{
          height: '100%',
        }}>
          {
            feedbackType === "suggestQuestions" ?
              (
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", flexGrow: 1, width: '100%' }}>
                  <EditorContiner>
                    <TitleBar>
                      <Heading>Suggest Question</Heading>
                      <Autocomplete
                        options={["Number Line", "Types of Numbers", "Prime Numbers", "Tally System"]}
                        getOptionLabel={(option) => option}
                        sx={{
                          width: '30%',
                          '& .MuiInputBase-root': { height: 50 },
                          '& .MuiOutlinedInput-root': { padding: '5px' },
                        }}
                        value={topic}
                        onChange={(e, value) => setTopic(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Topic"
                            variant="outlined"
                            fullWidth
                            error={errors.topic}
                            helperText={errors.topic ? "Topic is required" : ""}
                          />
                        )}
                      />
                    </TitleBar>
                    <Divider />
                    <ContentBox>
                      <Heading >
                        Question
                      </Heading>
                      <CustomTextField
                        placeholder="Enter your question"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        error={errors.question}
                        helperText={errors.question ? "Question is required" : ""}
                      />

                      <Divider style={{ margin: "16px 0", borderWidth: "1px" }} />
                      <OptionBox
                        options={options}
                        setOptions={setOptions}
                        correctOption={correctOption}
                        setCorrectOption={setCorrectOption}
                        explanation={explanation}
                        setExplanation={setExplanation}
                        errors={errors}
                      />
                      {/* <Divider /> */}
                    </ContentBox>
                  </EditorContiner>

                </Box>
              )
              :
              (

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  height: '100%'
                }}>
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
                      errors.feedbackText
                        ? feedbackText.length < 50
                          ? "Your feedback must be at least 50 characters"
                          : "Please provide your feedback"
                        : ""
                    }
                    sx={{
                      flexGrow: 1,
                    }}

                  />
                  {feedbackType === "bug" && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                      <Button variant="outlined" component="label" fullWidth>
                        Upload Screenshot (Max 2MB each, up to 3 screenshots)
                        <input type="file" hidden multiple onChange={handleFileUpload} />
                      </Button>
                      <Box sx={{ display: "flex", flexDirection: "row", gap: "10px", flexGrow: 1 }}>
                        {screenshots.map((screenshot, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              position: "relative",
                            }}
                          >
                            <img
                              src={URL.createObjectURL(screenshot)}
                              alt={`Screenshot ${index}`}
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                            <IconButton
                              color="error"
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: -15,
                              }}
                              onClick={() => {
                                const updatedScreenshots = screenshots.filter((_, i) => i !== index);
                                setScreenshots(updatedScreenshots);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              )
          }
        </Box>
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
            "&:hover": {
              backgroundColor: "Black",
              boxShadow: "2px 3px #FFDA55",
            },
            mt:'20px'
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
              : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default FeedBack;
