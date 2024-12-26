import React, { useRef } from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Stepper,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  StepConnector,
  stepConnectorClasses,
  Step,
  StepLabel,
} from "@mui/material";
import { useGetAllSectionQuery } from "../../Redux/API/Career.Api";
import PropTypes from "prop-types";
import { Check } from "@mui/icons-material"; // Assuming you're using Check from MUI
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuizSessionMutation } from "../../Redux/API/Quiz.Api";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";
import toast from "react-hot-toast";
import { LoadingScreen } from "../../Components";

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}
QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 20,
    left: "calc(-50% + 7px)",
    right: "calc(50% + 7px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#FFDA55",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#FFDA55",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 5,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: "2px solid #ccc",
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundColor: "#FFDA55",
        boxShadow: "2px 2px #02216F",
        color: "#02216F",
        border: "2px solid #02216F",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundColor: "#FFDA55",
        color: "#02216F",
        border: "2px solid #02216F",
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontFamily: "'Suranna'  !important",
          fontSize: "20px",
        }}
      >
        {props.icon}
      </Typography>
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

function LevelDetails() {
  const { data: SectionList, isError, isLoading } = useGetAllSectionQuery();
  const theme = useTheme();
  const UserData = useSelector((state) => state.UserState);
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const scrollContainerRef = useRef(null);
  const [searchParams] = useSearchParams();
  const sectionIndex = searchParams.get("section");
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch lessons and topics data

  console.log("section data:", SectionList);
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Typography>Error fetching lessons</Typography>;
  }
  const handleQuizCraetion = (
    sectionIndex,
    lessonIndex,
    topicIndex,
    topicId,
    questionCount = 3
  ) => {
    try {
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({
          sectionIndex,
          lessonIndex,
          topicIndex,
          topicId,
          questionCount: 3,
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
  // Generate dynamic steps based on fetched lessons and topics
  return (
    <>
      {SectionList &&
        SectionList[sectionIndex]?.lesson?.map((lesson, lessonIndex) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "#fff",
              mb: "16px",
              mr: isSm ? null : "30px",
              border: "2px solid",
              borderColor: "#02216F",
              gap: "20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
                width: "100%",
                mb: isSm ? "40px" : "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  variant={isMd ? "h6" : "h5"}
                  sx={{
                    fontWeight: "bold",
                    color: "#02216F",
                  }}
                >
                  {lesson.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    height: "40px",
                    width: "150px",
                    fontWeight: "bold",
                    backgroundColor: "#1A49BA",
                    color: "#fff",
                    borderRadius: "50px",
                    textTransform: "none",
                    border: "1px solid",
                    borderColor: "#FFDA55",
                    "&:hover": {
                      color: "#1A49BA",
                      backgroundColor: "#FFDA55",
                    },
                  }}
                >
                  Start
                </Button>
              </Box>

              <Box
                ref={scrollContainerRef}
                onWheel={handleWheel}
                sx={{
                  width: "100%",
                  overflowX: "auto",
                  display: "flex",
                  padding: "10px 0",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                <Stack sx={{ width: "100%" }} spacing={4}>
                  <Stepper
                    alternativeLabel
                    activeStep={
                      UserData?.careerPathProgress?.sections[sectionIndex]
                        ?.lessons[lessonIndex]?.topics.length - 1
                    }
                    connector={<ColorlibConnector />}
                  >
                    {lesson?.topics?.map((topic, index) => (
                      <Step
                        key={topic._id}
                        onClick={() =>
                          handleQuizCraetion(
                            sectionIndex,
                            lessonIndex,
                            index,
                            topic._id
                          )
                        }
                      >
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                          <Typography
                            variant="body1" 
                            sx={{
                              fontWeight: "bold",
                              textAlign: "center",
                              color: "#333", 
                              fontSize: "14px", 
                              mx:'10px',
                              px:'10px'
                            }}
                          >
                            {topic.name}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                flexDirection: "column",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <Typography
                variant="body"
                sx={{
                  fontWeight: "bold",
                  color: "WHITE",
                  px: "20px",
                  py: "6px",
                  bgcolor: "#1A49BA",
                  borderRadius: "20px 0px 0px 0px",
                  alignSelf: "flex-end",
                }}
              >
                {(UserData?.careerPathProgress?.sections[sectionIndex].lessons[
                  lessonIndex
                ]?.topics.length
                  ? UserData?.careerPathProgress?.sections[sectionIndex]
                      .lessons[lessonIndex]?.topics.length
                  : 0) +
                  "/" +
                  lesson.totalTopic}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  ((UserData?.careerPathProgress?.sections[sectionIndex]
                    .lessons[lessonIndex]?.topics.length
                    ? UserData?.careerPathProgress?.sections[sectionIndex]
                        .lessons[lessonIndex]?.topics.length
                    : 0) /
                    lesson.totalTopic) *
                  100
                }
                sx={{
                  height: "10px",
                  bgcolor: "#FFDA55",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#1A49BA",
                    borderRadius: "20px",
                  },
                }}
              />
            </Box>
          </Box>
        ))}
    </>
  );
}

export default LevelDetails;
