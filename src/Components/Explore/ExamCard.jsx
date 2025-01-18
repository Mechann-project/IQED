import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

function ExamCard({ exam, isComingSoon = true }) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        maxWidth: isSm ? 150 : isMd ? 250 : 250,
        borderRadius: "10px",
        border: "1px solid",
        borderColor: "#02216F",
        boxShadow: "1px 2px #02216F",
        position: "relative",
      }}
    >
      {isComingSoon && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#FFDA55",
            color: "#02216F",
            fontWeight: "bold",
            fontSize: "0.75rem",
            padding: "2px 8px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          Coming Soon
        </Box>
      )}
      <CardMedia
        sx={{
          height: isSm ? 100 : isMd ? 100 : 180,
          m: "10px",
          borderRadius: "10px",
        }}
        image={exam.image}
        title={exam.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          component="div"
          sx={{
            fontWeight: "bold",
          }}
        >
          {exam.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: "regular" }}
        >
          {exam.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExamCard;
