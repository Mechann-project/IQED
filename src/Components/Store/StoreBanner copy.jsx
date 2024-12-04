import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";
import { TShirtPNG } from "../../assets";

const StoreBanner = () => {
  const items = [
    {
      id: 1,
      title: "Grab Upto 50% Off On Selected Headphones",
      img: TShirtPNG,
    },
    {
      id: 2,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
    {
      id: 3,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
    {
      id: 4,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
  ];

  return (
    <Carousel
      indicators={true}
      animation="slide"
      interval={null} 
      duration={1000}
      swipe={true}
      stopAutoPlayOnHover={true}
      sx={{
        borderRadius: "10px",
        height: "250px",
        overflow: "hidden",
        // position: "relative",
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        },
      }}
    >
      {items.map((item) => (
        <Box
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "200px",
            backgroundColor: "#FBF0E4",
            boxSizing: "border-box",
            padding: { xs: "10px", sm: "20px" },
          }}
        >
          {/* Text Section */}
          {/* <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            
          </Box> */}
          <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
              }}
            >
              {item.title}
            </Typography>

          {/* Image Section */}
          {/* <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
          </Box> */}
          <img
              src={item.img || "/placeholder.png"} // Fallback image
              alt={`Banner for ${item.title}`}
              style={{
                Height: "80px",
                Width: "80px",
                // objectFit: "contain",
                borderRadius: "10px",
              }}
            />
        </Box>
      ))}
    </Carousel>
  );
};

export default StoreBanner;
