import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography, Button } from "@mui/material";
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
      interval={4000}
      duration={1000}
      
      swipe={true}
      stopAutoPlayOnHover={true}
      sx={{ 
        borderRadius: "10px",
        
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
            backgroundColor: "#FBF0E4",
            paddingX: { xs: "10px", sm: "20px" }, // Adjust padding for smaller screens
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row", // Stack elements on small screens and align horizontally on larger screens
            justifyContent: "space-between",
            alignItems: "center",
            height: "200px",
            
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" }, // Adjust font size for different screens
                textAlign: { xs: "center", sm: "left" }, // Center text on smaller screens
              }}
            >
              {item.title}
            </Typography>
            
          </Box>
          <Box
            sx={{
              marginTop: { xs: "10px", sm: "0" }, // Adjust margin for smaller screens
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={item.img}
              alt="Product"
              style={{
                maxHeight: "150px", // Reduce image size on smaller screens
                borderRadius: "10px",
                maxWidth: "100%",
                objectFit: "cover", // Ensure the image fits well
              }}
            />
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default StoreBanner;
