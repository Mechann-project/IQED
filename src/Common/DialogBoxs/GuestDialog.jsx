import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SVGLoader } from "../../assets";
import { useParams } from "react-router-dom";

const GuestDialog = ({ open,onJoin }) => {
const {GameCode} = useParams()
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [joinCode, setJoinCode] = useState(GameCode);

  const stepRef = useRef(null);
  const joinCodeRef = useRef(null);
  const nameInputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (joinCodeRef.current && nameInputRef.current && buttonRef.current) {
      gsap.fromTo(
        [joinCodeRef.current, nameInputRef.current, buttonRef.current],
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
      );
      gsap.fromTo(
        buttonRef.current,
        { rotation: -10 },
        { rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }

    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { x: step === 1 ? -200 : 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [step]);

  const handleNextClick = () => {
    if (step === 1) {
      if (!joinCode) {
        setError("Join code is required.");
        return;
      }
      setStep(2);
    } else {
      if (!name) {
        setError("Name is required.");
        return;
      }
      setLoading(true);
      // Trigger the join callback
      onJoin(joinCode, name)
        .then(() => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message || "Failed to join room.");
        });
    }
  };
  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          width: { xs: "90%", sm: "80%", md: "100%" },
          maxWidth: "600px",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#FFDA55",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            px: "15px",
            py: "5px",
            color: "#02216F",
            fontSize: { xs: "25px", md: "20px", lg: "30px" },
            fontWeight: "bold",
          }}
        >
          Welcome to <b>IQED’s</b> <br /> 1v1 Duel Challenge Lobby! <br />
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          bgcolor: "#FFDA55",
        }}
      >
        <Box
          sx={{
            bgcolor: "#02216F",
            borderRadius: "20px",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "16px", md: "24px" },
              fontWeight: "bold",
              p: "10px",
            }}
          >
            Let the battle of wits begin!
          </Typography>
          <Divider sx={{ bgcolor: "#FFDA55", mb: "3%" }} />

          <Box
            sx={{
              p: { xs: "5%", md: "5%" },
              color: "#fff",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexGrow: 1,
                p: "10px",
                borderRadius: "10px",
                boxSizing: "border-box",
                gap: "20px",
              }}
              ref={stepRef} // Attach GSAP animation reference
            >
              {step === 1 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: { xs: "5px", md: "10px" },
                    padding: "5px 10px",
                    border: "1px solid",
                    borderColor: error ? "red" : "white",
                    height: "50px",
                    boxShadow: error ? "2px 3px red" : "2px 3px white",
                  }}
                  ref={joinCodeRef}
                >
                  <input
                    placeholder={error ? error : "Enter a join code"}
                    value={joinCode}
                    onChange={(e) => {
                      setJoinCode(e.target.value);
                      setError(""); // Clear error when typing
                    }}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      color: error ? "red" : "black",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderRadius: { xs: "5px", md: "10px" },
                    padding: "5px 10px",
                    border: "1px solid",
                    borderColor: "white",
                    height: "50px",
                    boxShadow: "2px 3px white",
                  }}
                  ref={nameInputRef}
                >
                  <input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  />
                </Box>
              )}
              <Button
                onClick={handleNextClick}
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  fontSize: { md: "24px" },
                  backgroundColor: "#FFDA55",
                  color: "#02216F",
                  boxShadow: "2px 3px white",
                  borderRadius: { xs: "5px", md: "10px" },
                  textTransform: "none",
                  border: "1px solid",
                  borderColor: "white",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "black",
                    transform: "translateY(-5px)",
                    transition: "transform 0.3s ease-in-out",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                ref={buttonRef}
                disabled={loading}
              >
                {loading ? (
                  <SVGLoader size={40} />
                ) : step === 1 ? (
                  "Next"
                ) : (
                  "Join"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default GuestDialog;
