import { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { OptionButton } from "../../Common";
import { RabbitIMG } from "../../assets/Image";

const IQQuestionBox = ({ index, Question }) => {
  const [fade, setFade] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    setFade(false); // Reset to false before the next render
    const timer = setTimeout(() => {
      setFade(true); // Trigger the fade-in and scale transition after the question change
    }, 800); // Delay for smooth transition

    return () => clearTimeout(timer); // Clean up timeout on unmount or re-render
  }, [index]); 

  
  if (!Question || !Question.options || Question.options.length === 0) {
    return <Typography variant="h6" color="white">No options available for this question.</Typography>;
  }
console.log(Question)
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
          transform: fade ? "scale(1)" : "scale(0.8)", 
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
            Q{index + 1} {Question.question}
          </Typography>
          {Question.type === "text-image" && (
            <Box
              component="img"
              src={Question.questionImage}
              sx={{
                width:{lg: "250px", md: "200px", xs: "180px"},
                height: "auto",
                maxWidth: "100%",
                 mb:'4%'
              }}
              onClick={handleOpen}
              alt="Rabbit"
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
          {Question.options.map((option, idx) => (
            <OptionButton
              key={idx}
              index={idx}
              quiz={Question}
              type={option.type}
              content={option.content}
            />
          ))}
        </Box>
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
            src={Question.questionImage}
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

export default IQQuestionBox;
