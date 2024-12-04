import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  MenuItem,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Icon for success
import { IQGemIcon, TShirtImg } from "../../assets";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate, useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds, IPX8",
    rating: 4.5,
    reviews: 121,
    image: TShirtImg,
    description: "Organic Cotton, fairtrade certified",
    originalPrice: 200,
    discountedPrice: 150,
    type: "Electronics",
  },
  {
    id: 2,
    name: "AirPods Max",
    rating: 4.8,
    reviews: 121,
    image: TShirtImg,
    description: "A perfect balance of high-fidelity audio",
    originalPrice: 300,
    discountedPrice: 250,
    type: "Electronics",
  },
  {
    id: 3,
    name: "Kids IQ Puzzle Toy",
    rating: 4.3,
    reviews: 121,
    image: TShirtImg,
    description: "Educational toy for kids",
    originalPrice: 50,
    discountedPrice: 40,
    type: "Toys",
  },
  {
    id: 4,
    name: "Men's T-Shirt",
    rating: 4.0,
    reviews: 121,
    image: TShirtImg,
    description: "100% Cotton",
    originalPrice: 25,
    discountedPrice: 20,
    type: "Clothing",
  },
];

const OrdersPage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleBlack = () => navigate("/store");

 

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflow: "hidden",
        marginTop: "10px",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          gap: isSm ? "10px" : "20px",
          bgcolor: "#1A49BA",
          boxSizing: "border-box",
          p: "20px",
          borderRadius: "10px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            width: "100%",
          }}
        >
          <IconButton
            aria-label="back"
            onClick={handleBlack}
            sx={{
              p: 0,
              color: "white",
              "&:hover": {
                color: "#FFDA55",
              },
            }}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Typography
            variant={"h6"}
            sx={{
              color: "White",
              fontWeight: "bold",
            }}
          >
            Product Detail
          </Typography>
        </Box>

       
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          p: "20px",
          flexGrow: 1,
          bgcolor: "#F3F7FF",
          borderRadius: "10px",
          fontFamily: "Poppins",
          border: "2px solid",
          borderColor: "#02216F",
          boxShadow: "2px 3px #02216F",
          mb: "10px",
          mr: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            boxSizing: "border-box",
            px: "10px",
            py: "5px",
            borderRadius: "5px",
            fontSize: "18px",
          }}
        >
          <AddShoppingCartIcon
            sx={{
              width: isSm ? "10%" : "5%",
              height: "auto",
            }}
          />
          Shipping Information
        </Typography>
        <Divider orientation="horizontal" />

        
      </Box>
    </Box>
  );
};

export default OrdersPage;
