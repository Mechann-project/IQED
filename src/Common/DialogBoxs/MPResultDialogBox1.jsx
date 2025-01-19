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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { useSelector } from "react-redux";
import { CUP, IQCoinIcon, MathBannerIMG, S_Medal } from "../../assets";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import { MPRewardCard, VSCard } from "../Cards";
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
  const [ResultMessage, setResultMessage] = useState(null);

  useEffect(() => {
    if (GameSessionState?.status === "completed") {
      if (GameSessionState?.Winner !== null) {
        if (GameData.index === GameSessionState?.Winner) {
          setResultMessage("Winner");
        } else {
          setResultMessage("Runner");
        }
      } else {
        setResultMessage("Match Tie");
      }
      setOppPlayer(GameSessionState?.Players[GameData.index === 0 ? 1 : 0]);
    }
  }, [GameSessionState]);
  console.log(OppPlayer);
  const leaderboardData = [
    {
      name: GameData?.Players?.[0]?.Name || "Unknown",
      score: SessionState.score || 0,
      time: SessionState.timeTaken || 0,
      status: ResultMessage === "Winner" ? "Winner" : "Runner",
    },
    OppPlayer
      ? {
          name: OppPlayer?.Name || "Unknown",
          score: OppPlayer?.score || 0,
          time: OppPlayer?.timeTaken || "00:00",
          status: ResultMessage === "Winner" ? "Runner" : "Winner",
        }
      : null,
  ].filter(Boolean); 

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
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

  const LeaderboardRow = ({ player }) => {
    let medalSrc = S_Medal;
    // if (ResultMessage === "You Win") medalSrc = G_Medal;

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
  const cardData = [
    {
      title: "Answered",
      leftText: SessionState.score,
      coinValue: SessionState.score * 1,
    },
    {
      title: "Time Taken",
      leftText: formatTime(SessionState.timeTaken),
      coinValue: Math.max(
        0,
        Math.floor((25 - SessionState.timeTaken / 60) * 1)
      ),
    },
    { title: "Total Coins Earned", coinValue: Totalxp },
  ];

  return (
    <>
      <Dialog
        open={open}
        sx={{
          borderRadius: "10px",

          backdropFilter: "blur(6px)",
          "& .MuiDialog-paper": {
            // backgroundColor: "transparent",
            boxShadow: "none",

            // border:'1px solid black'
          },
        }}
      >
        <VSCard />
        <DialogContent
          sx={{
            boxSizing: "border-box",
            boxShadow: "2px 3px #FFDA55 !important",
            p: "0px",
            "& .css-7d3xxb-MuiCardContent-root": {
              p: 0,
            },
          }}
        >
          <CardMedia
            component="img"
            image={CUP}
            alt={"dsd"}
            sx={{
              px: "20px",
              py: "10px",
              height: "200px",
              width: "300px",
              borderRadius: "6px",
              objectFit: "contain",
            }}
          />
          <CardContent
            sx={{
              boxSizing: "border-box",
              pl: 0,
              pr: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "#FFB74D",
                  position: "relative",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 0, zIndex: 99 }}
                >
                  {GameSessionState?.status !== "completed" ? (
                    "waiting.. anther Player"
                  ) : (
                    <>{ResultMessage}</>
                  )}
                </Typography>

                <Typography
                  gutterBottom
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&::before, &::after": {
                      content: '""',
                      flex: 1,
                      height: "1px",
                      bgcolor: "black",
                      mx: 1,
                    },
                  }}
                >
                  {GameSessionState?.Players[GameData.index].Name}
                </Typography>
              </Box>
              <TableContainer>
                <Table
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <TableBody>
                    {/* Row 1: Score */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "900",
                          color: "#02216F",
                          fontSize: "12px",
                          p: "12px",
                        }}
                      >
                        Score : {SessionState.score}
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#FFDA55",
                            borderRadius: "50px",
                            width: "auto",
                            height: "25px",
                          }}
                          maxWidth={70}
                        >
                          <Avatar
                            src={IQCoinIcon}
                            sx={{ width: 30, height: 30 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "900",
                              color: "#02216F",
                              fontSize: "12px",
                              p: "2px",
                            }}
                          >
                            {SessionState.score * 1}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Row 2: Time Taken */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "900",
                          color: "#02216F",
                          fontSize: "12px",
                          p: "12px",
                        }}
                      >
                        Time taken: {formatTime(SessionState.timeTaken)}
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#FFDA55",
                            borderRadius: "50px",
                            width: "auto",
                            height: "25px",
                          }}
                          maxWidth={70}
                        >
                          <Avatar
                            src={IQCoinIcon}
                            sx={{ width: 30, height: 30 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "900",
                              color: "#02216F",
                              fontSize: "12px",
                              p: "2px",
                            }}
                          >
                            {/* {SessionState.score === 0
                              ? 0
                              : Math.max(
                                  0,
                                  Math.floor(25 - SessionState.timeTaken / 60)
                                )} */}
                            {Math.max(
                              0,
                              Math.floor(25 - SessionState.timeTaken / 60)
                            )}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Row 3: Total */}
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "900",
                          color: "#02216F",
                          fontSize: "12px",
                          p: "12px",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#FFDA55",
                            borderRadius: "50px",
                            width: "auto",
                            height: "25px",
                          }}
                          maxWidth={70}
                        >
                          <Avatar
                            src={IQCoinIcon}
                            sx={{ width: 30, height: 30 }}
                          />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: "900",
                              color: "#02216F",
                              fontSize: "12px",
                              p: "2px",
                            }}
                          >
                            {SessionState.score === 0 ? 0 : Totalxp}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box>
                <Divider
                  sx={{
                    borderBottomWidth: 3,
                    borderRadius: "10px",
                    borderColor: "black",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    p: "10px",
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => setOpenLeaderBoard(true)}
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
                    Score Board
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    // startIcon={<PeopleIcon />}
                    variant="contained"
                    onClick={handleDone}
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
                    Done
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
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

export default MPResultDialogBox;
