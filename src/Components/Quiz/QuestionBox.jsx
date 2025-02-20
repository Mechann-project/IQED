import { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { OptionButton } from "../../Common";
import { useSelector } from "react-redux";

const QuestionBox = ({ index, Question }) => {
  const QuizState = useSelector((state) => state.QuizState);
  const [fade, setFade] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(Question);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [imageFade, setImageFade] = useState(false);
  const [open, setOpen] = useState(false);
  const [visibleQuestion, setVisibleQuestion] = useState(Question);
  const [visibleIndex, setvisibleIndex] = useState(index);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const isLive = QuizState?.isLive;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!animationInProgress) {
      if (isFirstRender) {
        setFade(true);
        setImageFade(true);
        setIsFirstRender(false);
      } else {
        setAnimationInProgress(true);
        setFade(false);

        const timer = setTimeout(() => {
          setCurrentQuestion(Question);
          setImageFade(false);
          setTimeout(() => {
            setVisibleQuestion(Question);
            setvisibleIndex(index);
            setImageFade(true);
            setFade(true);
            setAnimationInProgress(false);
          }, 500);
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [Question]);

  if (!currentQuestion || !currentQuestion.options || currentQuestion.options.length === 0) {
    return (
      <Typography variant="h6" color="white">
        No options available for this question.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A49BA",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", md: "75%", lg: "65%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          opacity: fade ? 1 : 0,
          // transform: fade ? "scale(1)" : "scale(0.8)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
        gap={3}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: { xs: "40vh", md: "55vh" },
            minHeight: "20vh",
          }}
          gap={2}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "600",
              fontSize: { lg: "30px", md: "25px", xs: "20px" },
              color: "white",
            }}
          >
            Q{visibleIndex + 1}) {visibleQuestion.question}
          </Typography>

          {currentQuestion.type === "text-image" && (
            <Box
              component="img"
              src={currentQuestion.questionImage}
              sx={{
                width: { lg: "250px", md: "200px", xs: "180px" },
                height: "auto",
                maxWidth: "100%",
                mb: "4%",
                borderRadius: "10px",
                border: "4px solid #FFDA55",
                boxShadow: "2px 3px #0b276b",
                opacity: imageFade ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
              onClick={handleOpen}
              alt="QuestionImage"
            />
          )}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {currentQuestion.options.map((option, idx) => (
            <OptionButton
              key={idx}
              index={index}
              quiz={currentQuestion}
              type={option.type}
              content={option.content}
            />
          ))}
        </Box>

        {(visibleQuestion.correctAnswer.explanation !== "" && !isLive) &&
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "cenetr",
              maxHeight: { xs: "40vh", md: "55vh" },
              minHeight: "20vh",
            }}
            gap={1}
          >
            <Typography
              // variant="body"
              align="center"
              sx={{
                fontWeight: "600",
                fontSize: { lg: "20px", md: "15px", xs: "10px" },
                color: "white",
              }}
            >
              Explanation
            </Typography>
            <Typography
              // variant="body"
              align="center"
              sx={{
                fontWeight: "600",
                fontSize: { lg: "20px", md: "15px", xs: "10px" },
                color: "white",
              }}
            >
              {visibleQuestion.correctAnswer.explanation}
            </Typography>

          </Box>
        }
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            outline: "none",
            borderRadius: "8px",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
        >
          <img
            src={currentQuestion.questionImage}
            alt={"img"}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default QuestionBox;
