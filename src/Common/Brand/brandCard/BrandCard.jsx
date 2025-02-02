import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
  useTheme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { IQGemIcon, TShirtImg } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useCreateChallengeSessionMutation } from "../../../Redux/API/Quiz.Api";
import toast from "react-hot-toast";
import { resetQuiz } from "../../../Redux/Slice/QuizSlice/QuizSlice";
import { useCheckUserOrderQuery } from "../../../Redux/API/User.Api";

const StatItem = styled(Box)({
  flex: 1,
  textAlign: "center",
  color: "#02216F",
  display: "flex",
  flexDirection: "column",
  gap: 1,
  justifyContent: "space-between",
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  // marginTop: 20,
});

const BrandCard = ({ Data, isSideBar, trigger }) => {
  console.log("challengeData", Data);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserData = useSelector((state) => state.UserState);
  const userCoin = UserData?.earnings?.iqGems;
  const isAffordable = userCoin >= Data.eligibleGem;
  const [openTooltip, setOpenTooltip] = useState(false);
  const handleCardClick = () => {
    if (!isAffordable) {
      setOpenTooltip(true);
      setTimeout(() => {
        setOpenTooltip(false);
      }, 2000);
    }
  };
  const navigate = useNavigate();
  const [CreateChallengeSession] = useCreateChallengeSessionMutation();
  const { data: NotOrder, isSuccess: Loading } = useCheckUserOrderQuery(
    Data._id
  );
  const dispatch = useDispatch();
  const handleQuizCraetion = (topicId, ChallengeId) => {
    try {
      console.log("quiz craeter", topicId, ChallengeId);
      dispatch(resetQuiz());
      toast.promise(
        CreateChallengeSession({
          topicId,
          questionCount: 3,
          ChallengeId,
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
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 3,
        border: "1px solid #02216F",
        // backgroundColor: "#1A49BA",
        position: "relative",
        boxSizing: "border-box",
        // overflow: "visible",
        filter: Data.Active ? "none" : "grayscale(100%)",
        "&:hover": {
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(-5px)",
          boxShadow: "3px 4px #02216F",
          outline: "1px solid #02216F",
        },
      }}
    >
      {/* <Box
                sx={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    zIndex: 2,
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(${IQGemIcon})`,  // Correctly applying the background image
                    backgroundSize: 'cover',  // Ensures the image is scaled correctly to fit the box
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    // border: "2px solid black",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '900',
                        fontSize: '12px',
                        color: 'white',  // Ensures text is visible over the image
                    }}
                >
                    10
                </Typography>
            </Box> */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height={isSm ? "200" : "150"}
          image={Data.banner}
          alt="ProductThumile"
          sx={{
            borderRadius: "10px",
            // border: "2px solid #02216F",
            backgroundColor: "#f9f9f9",
            boxSizing: "border-box",
            objectFit: "contain",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "2px 6px",
            borderRadius: "5px",
          }}
        >
          Sponsored by {Data.sponsoreName}
        </Box>
      </Box>

      <CardContent
        sx={{
          textAlign: "left",
          color: "black",
          padding: " 10px 10px 10px 10px",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: "bold",
            textAlign: "justify",
            width: "100%",
            my: "10px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limits to 2 lines
            textOverflow: "ellipsis",
          }}
        >
          {Data.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            borderLeft: "solid 2px #02216F",
            pl: "5px",
            my: "10px",
          }}
        >
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "8px",
              mb: "2px",
              // color: '#02216F',
            }}
          >
            Challenge Topic
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: "15px",
              // backgroundColor:'#FFD700',
              color: "#02216F",
              borderRadius: "10px",
            }}
          >
            {Data.title}
          </Typography>
        </Box>
        <StatRow>
          <StatItem
            sx={{
              borderRight: "1px solid",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {Data.QuestionCount}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                py: "2px",
              }}
            >
              Total <br />
              MCQ{" "}
            </Typography>
          </StatItem>
          <StatItem
            sx={{
              borderRight: "1px solid",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {Data.TestTime} Min
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                py: "2px",
              }}
            >
              MCQ <br /> Time
            </Typography>
          </StatItem>
          <StatItem>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {Data.participantsCount}
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                py: "2px",
              }}
            >
              Total <br />
              winners
            </Typography>
          </StatItem>
        </StatRow>
      </CardContent>
      <Tooltip
        title={
          !isAffordable
            ? "You don't have enough gems to participate in this challenge."
            : ""
        }
        arrow
        placement="top"
        open={openTooltip}
        onClose={() => handleTooltipClose()}
        disableInteractive
        onMouseEnter={() => setOpenTooltip(true)}
        onMouseLeave={() => setOpenTooltip(false)}
      >
        <span>
          <Button
            variant="contained"
            disabled={isAffordable ? false : true}
            onClick={() => {
              if (!Data?.Winners?.includes(UserData?._id)) {
                handleQuizCraetion(Data?.Topic, Data?._id);
              } else {
                if (!NotOrder==true) {
                  toast.success("Order");
                  navigate(`/challenge/shipping/${Data?._id}`);
                } else {
                  toast.success("Challenge already Completed");
                }
              }
            }}
            sx={{
              width: "100%",
              backgroundColor: "#FFDA55",
              color: "black",
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: 0,
              justifyContent: "space-between",
              textTransform: "none",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
              "&:hover": {
                backgroundColor: "#E6C200",
              },
              "&.Mui-disabled": {
                backgroundColor: "#D3D3D3",
                color: "#A0A0A0",
              },
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                color: "black",
                fontSize: "10px",

                fontWeight: "bold",
              }}
            >
              Accept Challenge
            </Typography>

            <Typography
              variant="body"
              fontWeight="bold"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#02216F",
                ml: "10px",
                borderLeft: "2px solid",
                pl: "10px",
              }}
            >
              <Box
                component="img"
                src={IQGemIcon}
                alt="Gem Icon"
                sx={{
                  height: "18px",
                  marginRight: "4px",
                }}
              />
              {Data.eligibleGem}
            </Typography>
          </Button>
        </span>
      </Tooltip>
    </Card>
  );
};

export default BrandCard;
