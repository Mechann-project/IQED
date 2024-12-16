import React, { useState, useRef, useEffect } from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useSocket } from "../../../Socket/SocketContext";
import {
  ResetGame,
  setIndex,
  setPlayers,
  setRoomId,
  setSessionId,
} from "../../../Redux/Slice/GameSlice/GameSlice";
import toast from "react-hot-toast";

import { VS } from "../../../assets";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { GuestDialog, InviteCard, PlayerCard } from "../../../Common";
import { resetQuiz } from "../../../Redux/Slice/GameSlice/GameSessionSlice";


const MatchLobby = () => {
  const islogin = useLoaderData();
  const [GusetDialog, setGusetDialog] = useState(!islogin);
  const socket = useSocket();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserData = useSelector((state) => state.UserState);
  const GameData = useSelector((state) => state.GameState);
  const GameSessionState = useSelector((state) => state.GameSessionState);
  useEffect(() => {
    if (!socket) return;

    socket.on("room-updated", ({ playersList }) => {
      dispatch(setPlayers(playersList));
      toast.success(`${playersList[islogin?1:0].Name} is Connected`);
    });

    socket.on("game-started", (data) => {
      toast.success("Game started successfully.");
      console.log("pre",GameSessionState);
      dispatch(resetQuiz);
      dispatch(ResetGame);
      console.log("post",GameSessionState);
      dispatch(setSessionId(data.GameSession._id));
      navigate(`/match/${data.roomId}/${data.GameSession._id}`)
    });

    socket.on("user-disconnected", (data) => {
      toast.error(data.message);
    });
    socket.on("game-ended", (data) => {
      console.log(data.message);
    });
    return () => {
      socket.off("room-updated");
      socket.off("game-started");
      socket.off("user-disconnected");
      socket.off("game-ended");
    };
  }, [socket]);


  function joinRoom(roomId, Name) {
    console.log("Room " + roomId + "");
    socket.emit("join-room", { roomId, Name }, (response) => {
      if (response.success) {
        console.log(`Joined room ${roomId} successfully.`);
        dispatch(setRoomId(roomId));
        dispatch(setIndex(1));
        setGusetDialog(false);
      } else {
        setGusetDialog(true);
      }
    });
  }

  const handleStartClick = () => {
    if (GameData?.Players?.length <= 2) {
      const roomId = GameData?.RoomID;
      
      socket.emit("start-game", {roomId,UserId:UserData._id}, (response) => {
        if (response.success) {
          console.log("Game started successfully.");
        } else {
          console.error(response.error);
        } 
      });
    }
  };
  console.log(GusetDialog);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: isSm ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Player 1 Section */}
      <PlayerCard ishost={true} Player={GameData.Players[0]} />

      {/* "VS" Divider with larger SVG Image */}
      <Divider
        orientation={isSm ? "horizontal" : "vertical"}
        flexItem
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": { borderColor: "#1A49BA", borderWidth: "3px" },
          "&::after": { borderColor: "#FFDA55", borderWidth: "3px" },
          mx: isSm ? 0 : 2,
          my: isSm ? 2 : 0,
        }}
      >
        <img
          src={VS}
          alt="VS"
          style={{
            width: isSm ? 100 : 250,
            height: isSm ? 100 : 250,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Divider>

      {/* Player 2 Section */}
      <PlayerCard
        Player={GameData.Players.length > 1 ? GameData.Players[1] : null}
      />

      {islogin ? <InviteCard GameData={GameData} onStart={handleStartClick} /> : <></>}
      <GuestDialog open={GusetDialog} onJoin={joinRoom} />
    </Box>
  );
};

export default MatchLobby;

export const OnLoadLobby = async ({params}) => {
  const sessionid = Cookies.get("connect.sid");
  const {GameCode} = params;
  if (sessionid && GameCode) {
    return true;
  } else {
    return false;
  }
};
