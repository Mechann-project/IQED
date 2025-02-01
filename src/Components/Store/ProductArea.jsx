import React, { useState } from "react";
import {
  Box,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Typography,
  InputBase,
  IconButton,
  Collapse,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "./ProductCard";
import { TShirtImg } from "../../assets";
import { useNavigate } from "react-router-dom";
import BrandCard from "../../Common/Brand/brandCard/BrandCard";

const challengeData = [
  {
    SponsoredBy: "Allreal",
    topicName: "Number Lines",
    totalQuestions: 10,
    time: 10,
    giftCount: 5,
    gemRequired: 20,
  },
  {
    SponsoredBy: "IQED",
    topicName: "Speed Math",
    totalQuestions: 50,
    time: 30,
    giftCount: 10,
    gemRequired: 50,
  },
  {
    SponsoredBy: "Allreal",
    topicName: "Prime Numbers",
    totalQuestions: 60,
    time: 50,
    giftCount: 8,
    gemRequired: 150,
  }
];

const ProductArea = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        p: "10px",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: "20px",
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
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px 10px",
              flexGrow: 1,
            }}
          /> */}
          {/* <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={() => { navigate('/challenge/orders') }}>
            Earned Gifts
          </Button> */}
        </Box>
      </Box>
      {/* <Divider /> */}
      <Grid container spacing={2}>
        {challengeData.map((data, index) => (
          <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
            <BrandCard Data={data} />
          </Grid>
        )
        )}
      </Grid>

    </Box>
  );
};

export default ProductArea;
