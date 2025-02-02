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
// import { useGetAllSectionQuery } from "../../Redux/API/Career.Api";
import PropTypes from "prop-types";
import { Check } from "@mui/icons-material"; // Assuming you're using Check from MUI
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateQuizSessionMutation } from "../../Redux/API/Quiz.Api";
import { resetQuiz } from "../../Redux/Slice/QuizSlice/QuizSlice";
import toast from "react-hot-toast";
import { LoadingScreen } from "../../Components";
import { useGetCoursesQuery } from "../../Redux/API/Career.Api";
import LockIcon from '@mui/icons-material/Lock';

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

function RecentLevelDetails() {
  const { data: Course, isLoading } = useGetCoursesQuery();
  const theme = useTheme();
  const UserData = useSelector((state) => state.UserState);
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const scrollContainerRef = useRef(null);
  const sectionIndex = 0;
  const [CreateQuizSession] = useCreateQuizSessionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleQuizCreation = (
    sectionIndex,
    lessonIndex,
    topicIndex,
    topicId,
    questionCount = 20
  ) => {
    try {
      dispatch(resetQuiz());
      toast.promise(
        CreateQuizSession({
          sectionIndex,
          lessonIndex,
          topicIndex,
          topicId,
          questionCount,
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
      toast.error("Sorry, session not saved.");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!Course || !UserData) {
    return <Typography>Error fetching lessons</Typography>;
  }

  const activeLessonIndex = UserData?.CourseProgress?.currentLesson;
  const activeLesson =
    Course.units[sectionIndex]?.lessons[activeLessonIndex] || null;

  if (!activeLesson) {
    return <Typography>No active lesson found</Typography>;
  }

  // Calculate progress
  const totalTopics = activeLesson?.topics?.length || 0;
  const completedTopics = UserData?.CourseProgress?.currentTopic || 0;
  const progress = (completedTopics / totalTopics) * 100;

  return (
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
            {activeLesson.name}
          </Typography>
          {/* <Button
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
          </Button> */}
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
              activeStep={completedTopics}
              connector={<ColorlibConnector />}
            >
              {activeLesson?.topics?.map((topic, index) => (
                <Step
                  key={topic._id}
                  onClick={() => {
                    if (index <= completedTopics) {
                      handleQuizCreation(
                        sectionIndex,
                        activeLessonIndex,
                        index,
                        topic._id
                      );
                    } else {
                      toast.error(
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <LockIcon
                            style={{ marginRight: "8px", color: "inherit" }}
                          />
                          Topic Locked
                        </Box>,
                        {
                          icon: false,
                        }
                      );
                    }
                  }}
                >
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "#333",
                        fontSize: "14px",
                        mx: "10px",
                        px: "10px",
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
      {/* Bottom Progress Section */}
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
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: "white",
            px: "20px",
            py: "6px",
            bgcolor: "#1A49BA",
            borderRadius: "20px 0 0 0",
            alignSelf: "flex-end",
          }}
        >
          {`${completedTopics}/${totalTopics}`}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
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
  );
}

export default RecentLevelDetails;



