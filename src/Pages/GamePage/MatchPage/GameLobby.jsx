import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { VS } from "../../../assets";
import PlayerCard from "./PlayerCard";
import InviteCard from "./InviteCard";

const GameLobby = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: { lg: "row", xs: "column" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >

      <PlayerCard ishost={true} />
        <Divider
            flexItem
            sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: { lg: "100%", xs: "10px" },
            }}
        >
            <img
            src={VS}
            alt="VS"
            style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
            />
        </Divider>
      <PlayerCard />
      <InviteCard />


    </Box>
  );
};

export default GameLobby;
