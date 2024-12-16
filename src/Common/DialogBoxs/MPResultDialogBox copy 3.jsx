import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  CardActions,

} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useSelector } from "react-redux";
import { CUP, G_Medal, MathBannerIMG, S_Medal } from "../../assets";
import CloseIcon from "@mui/icons-material/Close";
const MPResultDialogBox = ({
  SessionState,
  open,
  handleReview,
  Level,
  handleDone,
  Totalxp,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const GameData = useSelector((state) => state.GameState);
  const GameSessionState = useSelector((state) => state.GameSessionState);
  const [openLeaderBoard, setOpenLeaderBoard] = useState(false);
  const [OppPlayer, setOppPlayer] = useState(null);
  const [ResultMessage, setResultMessage] = useState("will");

  useEffect(() => {
    if (GameSessionState?.status === "completed") {
      if (GameSessionState?.Winner !== -1) {
        if (GameData.index === GameSessionState?.Winner) {
          setResultMessage("You Win");
        } else {
          setResultMessage("You Lose");
        }
      } else {
        setResultMessage("Match Tie");
      }
      setOppPlayer(GameSessionState?.Players[GameData.index === 0 ? 1 : 0]);
    }
  }, [GameSessionState]);

  const leaderboardData = [
    {
      name: "You",
      score: SessionState.score,
      time: SessionState.timeTaken,
      status: ResultMessage === "You Win" ? "Winner" : "Runner",
    },
    {
      name: OppPlayer?.name || "Opponent",
      score: OppPlayer?.score || "0",
      time: OppPlayer?.timeTaken || "00:00",
      status: ResultMessage === "You Win" ? "Runner" : "Winner",
    },
  ];

  // Leaderboard Header
  const LeaderboardHeader = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        // gap: "5px",
      }}
    >
      <img
        src={CUP}
        alt="Cup Icon"
        style={{ width: "80px", height: "80px", top: "-30px" }}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          bgcolor: "#1A49BA",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          p: "10px",
          boxSizing: "border-box",
        }}
      >
        {["Player", "Score", "Time Taken", "Status"].map((label, index) => (
          <Typography
            key={index}
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  );

  // Leaderboard Row
  const LeaderboardRow = ({ player }) => {
    let medalSrc = S_Medal;
    if (ResultMessage === "You Win") medalSrc = G_Medal; // Gold medal for 1st place

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Conditional Medal Image */}
          {medalSrc && (
            <img
              src={medalSrc}
              alt="Medal Icon"
              style={{
                width: "60px",
                height: "60px",
                position: "relative",
                zIndex: 2,
              }}
            />
          )}
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "5px", // Adjust positioning as needed
              left: "5px", // Adjust positioning as needed
              zIndex: 1, // Ensures the avatar appears behind the medal
              overflow: "hidden",
              // filter: "drop-shadow(3px 3px 0px #02216F )", // Adjust values as needed
            }}
            src={""}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            bgcolor: "white",
            border: "2px solid",
            borderColor: "#02216F",
            boxShadow: "1px 2px #02216F",
            position: "relative",
            borderRadius: "8px",
            p: "10px",
            my: 1,
          }}
        >
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {player.name}
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {player.score}
          </Typography>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {formatTime(player.time)}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: player.status === "Winner" ? "green" : "red",
            }}
          >
            {player.status}
          </Typography>
        </Box>
      </Box>
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <>
      <Dialog
        open={open}
        // maxWidth="lg"
        fullWidth
        sx={{
          backdropFilter: "blur(2px)",
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "#02216F",
            backgroundColor: "white",
          }}
        >
          {/* Winning Message */}
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#02216F" }}
          >
            {ResultMessage}
          </Typography>
          <Grid item xs={6} sm={4} md={3}>
            <Card
              sx={{
                width: 300,
                textAlign: "center",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "white",
                position: "relative",
              }}
            >
              {/* Tag */}
              <Chip
                label="Winner"
                color="primary"
                sx={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "bold",
                }}
              />

              {/* Card Content */}
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  🎉 Congratulations 🎉
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {"Player Name"}
                </Typography>
              </CardContent>

              {/* Actions (Buttons) */}
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                {/* Leaderboard Button */}
                <IconButton
                  color="primary"
                  aria-label="leaderboard"
                  size="large"
                  onClick={() => alert("Leaderboard clicked")}
                >
                  <LeaderboardIcon />
                </IconButton>

                {/* OK or Done Button */}
                <Button
                  variant="contained"
                  color="success"
                  // onClick={onOkClick}
                  sx={{ fontWeight: "bold" }}
                >
                  OK
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Divider sx={{ bgcolor: "#FFDA55", height: "2px", width: "100%" }} />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              width: "100%",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleDone}
              sx={buttonStyles("#FFDA55", "#02216F", isSm)}
            >
              Done
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenLeaderBoard(true)}
              sx={buttonStyles("#FFDA55", "#02216F", isSm)}
            >
              Leader board
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* leaderboard */}
      <Dialog
        open={openLeaderBoard}
        maxWidth="lg"
        fullWidth
        sx={{
          backdropFilter: "blur(2px)",
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={() => setOpenLeaderBoard(false)}
          sx={{
            position: "absolute",
            top: 8,
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

        {/* Leaderboard */}
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "1px solid",
            borderColor: "#02216F",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ width: "100%", my: 2 }}>
            <Box
              sx={{
                p: isSm ? "10px" : "20px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 0,
              }}
            >
              <LeaderboardHeader />
            </Box>
            <Box
              sx={{
                p: isSm ? "10px" : "20px",
                overflowX: "auto",
                overflowY: "auto",
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
                borderTopWidth: "2px",
                borderRightWidth: "0",
                borderBottomWidth: "0",
                borderLeftWidth: "0",
                borderStyle: "solid",
                borderColor: "#02216F",
                flexGrow: 1,
                borderRadius: "10px",
                gap: "5px",
              }}
            >
              {leaderboardData.map((player, index) => (
                <LeaderboardRow key={index} player={player} />
              ))}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const buttonStyles = (bgColor, textColor, isSm) => ({
  fontWeight: "bold",
  backgroundColor: bgColor,
  color: textColor,
  borderRadius: "10px",
  textTransform: "none",
  border: "1px solid",
  borderColor: textColor,
  width: isSm ? "20px" : "20%",
  "&:hover": {
    backgroundColor: "#fff",
    transition: "transform 0.3s ease-in-out",
    transform: "translateY(-5px)",
  },
});

export default MPResultDialogBox;
