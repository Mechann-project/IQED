import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IQGemIcon, TShirtImg } from "../../../assets";


    
const BrandCard = () => {
    const product = 
    {
      productID: 1,
      name: "Wireless Earbuds, IPX8",
      rating: 4.5,
      reviews: 121,
      image: TShirtImg,
      description: "Organic Cotton, fairtrade certified",
      originalPrice: 200,
      discountedPrice: 150,
      type: "Electronics",
    }
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [openTooltip, setOpenTooltip] = useState(false);




  const handleCardClick = () => {
    if (!isAffordable) {
      setOpenTooltip(true); // Open Tooltip only if the product is not affordable
      // Close the tooltip after a short delay (e.g., 2000 ms)
      setTimeout(() => {
        setOpenTooltip(false);
      }, 2000); // Tooltip will close after 2 seconds
    }
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };



  
  

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "12px",
        "&:hover": {
          transition: "transform 0.3s ease-in-out",
          transform: "translateY(-5px)",
          boxShadow: "3px 4px #02216F",
          outline: "1px solid #02216F",
        },
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="150"
        image={product.image}
        alt={product.name}
        sx={{
          backgroundColor: "#f9f9f9",
        }}
      />

      <CardContent>
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            lineHeight: "1.5",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>
        {!isSm && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: "8px" }}
          >
            {product.description}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          {/* Original Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textDecoration: "line-through",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={IQGemIcon}
              alt="Gem Icon"
              sx={{
                height: "14px",
                marginRight: "4px",
              }}
            />
            {product.originalPrice}
          </Typography>
          {/* Discounted Price */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center", color: "#02216F" }}
          >
            <Box
              component="img"
              src={IQGemIcon}
              alt="Gem Icon"
              sx={{
                height: "18px",
                marginRight: "4px",
              }}
            />
            {product.discountedPrice}
          </Typography>
        </Box>
      </CardContent>

      {/* Get Now Button */}
      {/* <Tooltip
        title={
          !isAffordable ? "You don't have enough coins to get this product" : ""
        }
        arrow
        placement="top"
        open={openTooltip}
        onClose={handleTooltipClose}
        disableInteractive
        onMouseEnter={() => setOpenTooltip(true)}
        onMouseLeave={() => setOpenTooltip(false)}
      >
        <span>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to={`/store/shipping/${product.name}`}
            disabled={!isAffordable}
            sx={{
              borderRadius: 0,
              bgcolor: isAffordable ? "#1A49BA" : "#BDBDBD",
              cursor: !isAffordable ? "not-allowed" : "pointer",
            }}
          >
            Get Now
          </Button>
        </span>
      </Tooltip> */}
    </Card>
  );
};

export default BrandCard;
