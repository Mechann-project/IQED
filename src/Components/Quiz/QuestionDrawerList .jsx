import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionIndex } from "../../Redux/Slice/QuizSlice/QuizSlice";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function QuestionDrawerList({
  sessionState,
  open,
  handleClose,
  quizData = [],
  answeredQuestions = [],
  currentQuestionIndex,
  handleQuizListClick,
  handleSubmit,
  handleQuit,
  quizAllCompleted,
}) {
  const dispatch = useDispatch();
  const getBorderColor = (index) => {
    if (answeredQuestions.includes(index)) return "1px solid #1DC77B";
    if (index === currentQuestionIndex) return "1px solid #FFDA55";
    return "";
  };
  console.log("sessionState", sessionState);
  const DrawerList = useMemo(
    () => (
      <Box
        sx={{
          width: 350,
          zIndex: 99999,
        }}
        role="presentation"
        onClick={handleClose}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" fontWeight={900}>
            {sessionState.Topics ? sessionState.Topics : "Topics"}
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 15,
              right: 8,
              color: "#02216F",
              backgroundColor: "white",
              border: "1px solid #02216F",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 2,
          }}
          gap={2}
        >
          {sessionState.isLive &&(
          <Button
            type="submit"
            fullWidth
            disabled={!quizAllCompleted}
            variant="contained"
            onClick={handleSubmit}
            sx={{
              fontWeight: "bold",

              backgroundColor: "#1A49BA",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "Black",
              },
              boxShadow: "2px 3px #FFDA55",
            }}
          >
            Submit
          </Button>)}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleQuit}
            sx={{
              fontWeight: "bold",
              // backgroundColor: "#1A49BA",
              backgroundColor: "red",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "Black",
              },
              boxShadow: "2px 3px #FFDA55",
            }}
          >
            Leave
          </Button>
        </Box>

        <Divider
          sx={{ borderBottomWidth: 3, borderColor: "black", mb: "3%" }}
        />

        <Box
          sx={{
            bgcolor: "white",
            height: "80%", // Adjusted height to make space for buttons
            borderRadius: "0 0 20px 20px",
            p: 2,
          }}
        >
          <List>
            {quizData.map((quiz, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor:
                    index === sessionState.currentQuestionIndex
                      ? "#FFDA55" // Highlight the current question with yellow
                      : sessionState.answeredQuestions[index]
                      ? "#1DC77B50"
                      : "#c5c5c5",
                  border: getBorderColor(index),
                  borderRadius: "10px",
                  mt: 1,
                  "@media (hover: hover) and (pointer: fine)": {
                    "&:hover": {
                      bgcolor:
                        index === sessionState.currentQuestionIndex
                          ? "#FFDA5550" // Highlight the current question with yellow
                          : sessionState.answeredQuestions[index]
                          ? "#1DC77B5040"
                          : "#c5c5c550",
                      opacity: "90%",
                      cursor: "pointer",
                    },
                  },
                }}
                onClick={() => dispatch(setQuestionIndex(index))}
              >
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {`Quiz ${index + 1}`}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" fontWeight="400">
                      {quiz.question}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Divider
            sx={{ borderBottomWidth: 3, borderColor: "black", mt: "3%" }}
          />

          
        </Box>
      </Box>
    ),
    [
      quizData,
      answeredQuestions,
      currentQuestionIndex,
      handleClose,
      handleQuizListClick,
      handleSubmit,
      handleQuit,
    ]
  );

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      {DrawerList}
    </Drawer>
  );
}
