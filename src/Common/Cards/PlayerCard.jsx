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

const PlayerCard = ({ ishost = false, Player }) => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: ishost ? "#1A49BA" : "#FFDA55",
          color: "#FFFFFF",
        }}
      >
        {Player?.SocketId ? (
          <>
            <Avatar
              sx={{ width: 80, height: 80 }}
              src={
                Player.Profile ||
                "https://classroomclipart.com/image/static7/preview2/cute-furry-bear-animal-face-59756.jpg"
              }
              alt="User Profile"
            />
            <Typography variant="h5">{Player.Name}</Typography>
            <Typography variant="h5" sx={{ fontSize: "10px" }}>
              {Player.SocketId}
            </Typography>
          </>
        ) : (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
      </Box>

    </>
  );
};

export default PlayerCard;
