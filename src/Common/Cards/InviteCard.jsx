import React from 'react'
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material";
const InviteCard = ({GameData ,onStart}) => {
  return (
    <Card
    sx={{
      maxWidth: { xs: "90%", lg: 450 , md:450},
      width: "100%",
      position: "fixed",
      bottom: { xs: "5%", lg: 20 },
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 2,
      border: "2px solid",
      borderColor: "#02216F",
      boxShadow: "3px 4px #02216F",
      borderRadius: { xs: null, lg: "20px" },
      boxSizing: "border-box",
      // p:'10px'
    }}
  >
    <CardContent
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "600", color: "#02216F" }}
        gutterBottom
      >
        Ask your friends to
      </Typography>
      <Divider
        sx={{
          bgcolor: "#FFDA55",
          mb: "10px",
          height: "2px",
          width: "100%",
        }}
      />
      <Typography sx={{ fontWeight: "bold" }} gutterBottom>
        1. Use any device to open
      </Typography>
      <Box
        sx={{
          p: "5px",
          width: "60%",
          boxSizing: "border-box",
          bgcolor: "white",
          border: "2px solid",
          borderColor: "#02216F",
          borderRadius: "10px",
          color: "#02216F",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#02216F" }}>
          learn.iqed.in/join
        </Typography>
      </Box>
      <Typography sx={{ fontWeight: "bold" }} gutterBottom>
        2. Enter game code
      </Typography>
      <Box
        sx={{
          p: "5px",
          width: "60%",
          boxSizing: "border-box",
          bgcolor: "white",
          border: "2px solid",
          borderColor: "#02216F",
          borderRadius: "10px",
          color: "#02216F",
        }}
      >
        <Typography sx={{ fontWeight: "bold", color: "#02216F" }}>
        {GameData.RoomID || "Not Available"}
        </Typography>
      </Box>
    </CardContent>
    <CardActions>
      {GameData.Players.length>1 && <Button
        onClick={onStart}
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#FFDA55",
          color: "#02216F",
          boxShadow: "2px 3px white",
          borderRadius: { xs: "5px", md: "10px" },
          textTransform: "none",
          border: "2px solid",
          borderColor: "#02216F",
          "&:hover": {
            color: "#fff",
            backgroundColor: "black",
          },
        }}
      >
        Start
      </Button>}
    </CardActions>
  </Card>
  )
}

export default InviteCard