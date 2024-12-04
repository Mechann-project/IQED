import React, { useEffect, useRef } from "react";
import { Card, Typography, Box } from "@mui/material";
import { gsap } from "gsap";

const ProgressCard = ({ icon, title, Count, animate }) => {
  const countRef = useRef(null);

  useEffect(() => {
    if (countRef.current && animate) {
      gsap.fromTo(
        countRef.current,
        { innerText: 0 },
        {
          innerText: Count,
          duration: 2, // Duration of the animation
          ease: "power3.out",
          snap: { innerText: 1 }, // Rounds the value to an integer
          onUpdate: function () {
            countRef.current.innerText = Math.floor(this.targets()[0].innerText);
          },
        }
      );
    } else if (countRef.current && !animate) {
      countRef.current.innerText = Count; // Directly set the value if no animation is required
    }
  }, [Count, animate]);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "50px",
        padding: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        boxShadow: "2px 3px #02216F",
        borderRadius: "20px",
        border: "2px solid",
        borderColor: "#02216F",
      }}
    >
      <Box
        component="span"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <img src={icon} alt={title} width={50} height={50} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="900"
            sx={{
              color: "#02216F",
            }}
            ref={countRef}
          >
            {Count}
          </Typography>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              color: "#02216F",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProgressCard;
