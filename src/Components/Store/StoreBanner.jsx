import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography, Button } from "@mui/material";
import { ProductBG, TShirtPNG } from "../../assets";

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
      interval={5000}
      duration={300}
      swipe={true}
      stopAutoPlayOnHover={true}
      sx={{
        borderRadius: "10px",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            paddingX: { xs: "10px", sm: "20px" },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: "200px",
            gap: "10px",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {item.title}
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: { xs: "10px", sm: "0" },
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "black",
              position: "relative",
            }}
          >
            <img
              src={ProductBG}
              alt="Product Background"
              style={{
                borderRadius: "10px",
                maxWidth: "100%",
                objectFit: "fill",
                position: "absolute",
                zIndex: 1,
              }}
            />
            {/* <img
              src={item.img}
              alt="Product"
              style={{
                maxHeight: { lg: "150px", sm: "100px", xs: "100px" },
                borderRadius: "10px",
                maxWidth: "100%",
                objectFit: "cover",
                position: "absolute",
                zIndex: 2,
              }}
            /> */}
            <Box
              component="img"
              src={item.img}
              alt="Product"
              sx={{
                maxHeight: { lg: "150px", sm: "100px", xs: "100px" },
                maxWidth: "100%",
                objectFit: "cover",
                position: "absolute",
                zIndex: 2,
                borderRadius: "50px", 
              }}
            />
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default StoreBanner;
