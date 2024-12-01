import React from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const LevelCard = ({ level, progress, total, image, onSelect, active }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        borderRadius: "10px",
        boxSizing: "border-box",
        backgroundColor: active ? "#fff" : "#d3d3d3",
        mb: "16px",
        mr: isSm ? null : "30px",
        border: "2px solid",
        borderColor: active ? "#02216F" : "#a9a9a9",
        gap: "20px",
        position: "relative",
        overflow: "hidden",
        // opacity: active ? 1 : 0.6,
        pointerEvents: active ? "auto" : "none", // Disables interaction if not active
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
          mb: "20px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography
              variant={isMd ? "h6" : "h5"}
              sx={{
                fontWeight: "bold",
                color: active ? "#02216F" : "#a9a9a9",
              }}
            >{`Level ${level}`}</Typography>
          </Box>

          <Button
            variant="contained"
            onClick={onSelect}
            disabled={!active}
            sx={{
              height: { xs: "40px", sm: "40px", md: "50px", lg: "50px" },
              fontWeight: "bold",
              backgroundColor: active ? "#1A49BA" : "#a9a9a9",
              color: active ? "#fff" : "#666",
              boxShadow: active ? "2px 3px #FFDA55" : "none",
              borderRadius: "50px",
              textTransform: "none",
              border: "1px solid",
              borderColor: active ? "#FFDA55" : "#a9a9a9",
              "&:hover": active
                ? {
                    color: "#1A49BA",
                    backgroundColor: "#FFDA55",
                    transition: "transform 0.3s ease-in-out",
                    transform: "translateY(-5px)",
                    boxShadow: "2px 3px #1A49BA",
                    border: "1px solid",
                    borderColor: "#1A49BA",
                  }
                : {},
            }}
          >
            Continue
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: "16px",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt={`Level ${level}`}
            style={{
              width: "150px",
              height: "150px",
              filter: active ? "none" : "grayscale(100%)",
            }}
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
            color: active ? "white" : "#666",
            px: "20px",
            py: "6px",
            bgcolor: active ? "#1A49BA" : "#a9a9a9",
            borderRadius: "20px 0px 0px 0px",
            alignSelf: "flex-end",
          }}
        >{`${progress}/${total}`}</Typography>
        {/* Progress Bar fixed at the bottom */}
        <LinearProgress
          variant="determinate"
          value={(progress / total) * 100}
          sx={{
            height: "10px",
            bgcolor: "#FFDA55",
            "& .MuiLinearProgress-bar": {
              backgroundColor: active ? "#1A49BA" : "#a9a9a9",
              borderRadius: "20px",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LevelCard;
