import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Slide,
  Grow,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { AI_Icon, MathBannerIMG } from "../../assets";
import { useSocket } from "../../Socket/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { ResetGame, setPlayers, setRoomId } from "../../Redux/Slice/GameSlice/GameSlice";
import { resetQuiz } from "../../Redux/Slice/GameSlice/GameSessionSlice";
import { useGetCoursesQuery } from "../../Redux/API/Career.Api";
import LoadingScreen from "../Loading/LoadingScreen";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const GameTopicArea = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const socket = useSocket();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserData = useSelector((state) => state.UserState);
  const { data: Course, isLoading, isError } = useGetCoursesQuery();

  const cardData = useMemo(() => {
    if (!Course || !Course.units) return [];
    return Course.units[0]?.lessons[0]?.topics || [];
  }, [Course]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 300);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredCards = useMemo(() => 
    cardData.filter((card) =>
      card.name.toLowerCase().includes(searchInput.toLowerCase())
    ), [cardData, searchInput]);

  function createRoom(playerData) {
    dispatch(ResetGame());
    dispatch(resetQuiz());
    socket.emit("create-room", ({ playerData }), (response) => {
      if (response.roomId) {
        dispatch(setPlayers(response.playerList));
        console.log("Room created with ID:", response);
        sessionStorage.setItem("RoomID", response.roomId);
        dispatch(setRoomId(response.roomId));
        navigate(`/match/${response.roomId}`);
      } else {
        console.error("Failed to create room.");
      }
    });
  }

  const handleChallengeFriend = () => {
    if (selectedCard) {
      createRoom(UserData.name);
      handleClose();
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  // if (isError || !Course) {
  //   return (
  //     <Box>
  //       <Typography>Error loading courses. Please try again later.</Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "20px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            boxSizing: "border-box",
            px: "10px",
            py: "5px",
            borderRadius: "5px",
            fontSize: isSm ? "14px" : "18px",
          }}
        >
          <img
            src={AI_Icon}
            alt="Ai_Icon"
            style={{ width: "18px", height: "18px" }}
          />
          Battle Topics
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "25px",
            padding: "5px 10px",
            border: "2px solid",
            borderColor: "#02216F",
          }}
        >
          <input
            placeholder="Search Topics"
            value={searchInput}
            onChange={handleSearchInputChange}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: isSm ? "10px" : "14px",
              color: "black",
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={2}>
        {filteredCards.map((card) => (
          <Grid item xs={6} sm={4} md={3} key={card.id}>
            <Card
              sx={{
                bgcolor: "#EEF7FF",
                "&:hover": {
                  transition: "transform 0.3s ease-in-out",
                  transform: "translateY(-5px)",
                  boxShadow: "2px 3px #02216F",
                },
              }}
              onClick={() => handleCardClick(card)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={MathBannerIMG}
                  alt={"image"}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="body"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        overflow: "hidden",
                      }}
                    >
                      {card.name}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          borderRadius: "10px ",
        }}
      >
        <DialogContent
          sx={{
            boxSizing: "border-box",
            p: "10px",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={MathBannerIMG}
              alt={selectedCard?.name}
              sx={{
                borderRadius: "6px",
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
                  gap: "10px",
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {selectedCard?.name}
                  </Typography>

                  <Typography gutterBottom variant="body" component="div">
                    Total Questions: 20
                  </Typography>
                  <Divider
                    sx={{
                      borderBottomWidth: 3,
                      borderRadius: "10px",
                      borderColor: "black",
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  startIcon={<PeopleIcon />}
                  variant="contained"
                  onClick={handleChallengeFriend} // Call the function here
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
                  Challenge Friend
                </Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GameTopicArea;



