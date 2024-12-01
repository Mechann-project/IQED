import React from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { WhiteBackgroundSVG } from "../../assets";

const LevelCard = ({
  level,
  // progress,
  // total,
  // image,
  onSelect,
  active
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("level", level);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "10px",
        // boxShadow: "3px 5px #02216F",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        mb: "16px",
        mr: isSm ? null : "30px",
        border: "2px solid",
        borderColor: "#02216F",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
        filter: active ? "none" : "grayscale(100%)",
        ...// Conditional background styles when not active
        (!active && {
          backgroundImage: `url(${WhiteBackgroundSVG})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSm ? "column-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
          mb: isSm?"40px":"20px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              gap: "8px",
            }}
          >
            <Typography
              variant={isMd ? "h6" : "h5"}
              sx={{
                fontWeight: "bold",
                color: "#02216F",
              }}
            >{`Section ${level.level}`}</Typography>
            <Typography
              variant="body2"
              sx={{
                color: "black",
              }}
            >
              {`Section ${level.description.split(" ").slice(0, 5).join(" ")}`}
              <br />
              {`${level.description.split(" ").slice(5).join(" ")}`}
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onSelect}
            disabled={!active}
            sx={{
              height: { xs: "40px", sm: "40px", md: "50px", lg: "50px" },
              width: isSm?"100%":"50%" ,
              fontWeight: "bold",
              backgroundColor: "#1A49BA",
              color: "#fff",
              boxShadow: "2px 3px #FFDA55",
              borderRadius: "50px",
              textTransform: "none",
              border: "1px solid",
              borderColor: "#FFDA55",
              "&:hover": {
                color: "#1A49BA",
                backgroundColor: "#FFDA55",
                transition: "transform 0.3s ease-in-out",
                transform: "translateY(-5px)",
                boxShadow: "2px 3px #1A49BA",
                border: "1px solid",
                borderColor: "#1A49BA",
              },
            }}
          >
            Continue
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: "16px",
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={level.image}
            alt={`Level ${level}`}
            style={{ width: "150px", height: "150px" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          position: "absolute",

          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Typography
          variant="body"
          sx={{
            fontWeight: "bold",
            color: "WHITE",
            px: "20px",
            py: "6px",
            bgcolor: "#1A49BA",
            borderRadius: "20px 0px 0px 0px",
            alignSelf: "flex-end",
          }}
        >{`${level.progress}/${level.total}`}</Typography>
        {/* Progress Bar fixed at the bottom */}
        <LinearProgress
          variant="determinate"
          value={level.total * 100}
          sx={{
            height: "10px",
            // borderRadius: "50px",
            // borderTop: "2px solid #1A49BA",

            bgcolor: "#FFDA55",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#1A49BA",
              borderRadius: "20px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LevelCard;
