import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Dialog,
  DialogContent,
  Button,
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
import { useGetCoursesQuery, useGetUnlockedTopicsQuery } from "../../Redux/API/Career.Api";
import LoadingScreen from "../Loading/LoadingScreen";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const GameTopicArea = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const socket = useSocket();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserData = useSelector((state) => state.UserState);
  const { data: CompletedTopics, isLoading } = useGetUnlockedTopicsQuery();

  const cardData = useMemo(() => CompletedTopics?.unlockedTopics || [], [CompletedTopics?.unlockedTopics]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  const handleSearchInputChange = (event) => setSearchInput(event.target.value);

  const filteredCards = useMemo(
    () =>
      cardData.filter((card) =>
        card.name.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [cardData, searchInput]
  );

  function createRoom(playerData, id) {
    dispatch(ResetGame());
    dispatch(resetQuiz());
    socket.emit("create-room", { playerData, TopicID: id }, (response) => {
      if (response.roomId) {
        dispatch(setPlayers(response.playerList));
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
      createRoom(UserData.name, selectedCard.id);
      handleClose();
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: "20px", overflowY: "auto", padding: "10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "bold", display: "flex", gap: "10px", alignItems: "center", fontSize: isSm ? "14px" : "18px" }}>
          <img src={AI_Icon} alt="Ai_Icon" style={{ width: "18px", height: "18px" }} />
          Battle Topics
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "25px", padding: "5px 10px", border: "2px solid #02216F" }}>
          <input
            placeholder="Search Topics"
            value={searchInput}
            onChange={handleSearchInputChange}
            style={{ flex: 1, border: "none", outline: "none", fontSize: isSm ? "10px" : "14px" }}
          />
        </Box>
      </Box>

      <Grid container spacing={2}>
        {filteredCards.map((card) => (
          <Grid item xs={6} sm={4} md={3} key={card.id}>
            <Card sx={{ bgcolor: "#EEF7FF", '&:hover': { transform: "translateY(-5px)", boxShadow: "2px 3px #02216F" } }} onClick={() => handleCardClick(card)}>
              <CardActionArea>
                <CardMedia component="img" height="150" image={MathBannerIMG} alt="Topic Image" />
                <CardContent>
                  <Typography sx={{ fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {card.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent sx={{ p: "10px" }}>
          <CardActionArea>
            <CardMedia component="img" height="180" image={MathBannerIMG} alt={selectedCard?.name} sx={{ borderRadius: "6px" }} />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{selectedCard?.name}</Typography>
              <Typography variant="body1">Total Questions: 20</Typography>
              <Divider sx={{ borderBottomWidth: 3, borderRadius: "10px", borderColor: "black" }} />
              <Button fullWidth startIcon={<PeopleIcon />} variant="contained" onClick={handleChallengeFriend} sx={{ fontWeight: "bold", backgroundColor: "#1A49BA", color: "#fff", '&:hover': { backgroundColor: "black" }, boxShadow: "2px 3px #FFDA55" }}>
                Challenge Friend
              </Button>
            </CardContent>
          </CardActionArea>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GameTopicArea;
