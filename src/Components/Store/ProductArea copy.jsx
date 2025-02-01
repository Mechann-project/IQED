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
import BrandCard from "../../Common/Brand/brandCard/BrandCard2";

const products = [
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
  },
  {
    productID: 2,
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
    productID: 3,
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
    productID: 4,
    name: "Men's T-Shirt",
    rating: 4.0,
    reviews: 121,
    image: TShirtImg,
    description: "100% Cotton",
    originalPrice: 25,
    discountedPrice: 20,
    type: "Clothing",
  },
  {
    productID: 5,
    name: "Men's ",
    rating: 4.0,
    reviews: 121,
    image: TShirtImg,
    description: "100% Cotton",
    originalPrice: 25,
    discountedPrice: 20,
    type: "sum",
  },
  {
    productID: 6,
    name: "Men T-Shirt",
    rating: 4.0,
    reviews: 121,
    image: TShirtImg,
    description: "100% Cotton",
    originalPrice: 25,
    discountedPrice: 20,
    type: "sum",
  },
];

const ProductArea = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortOrder, setSortOrder] = useState("HighToLow");
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const productTypes = [
    "All Types",
    ...new Set(products.map((product) => product.type)),
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesType =
        selectedType === "All Types" || product.type === selectedType;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "LowToHigh") {
        return a.discountedPrice - b.discountedPrice;
      } else if (sortOrder === "HighToLow") {
        return b.discountedPrice - a.discountedPrice;
      }
      return 0;
    });

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

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
          <InputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "5px 10px",
              flexGrow: 1,
            }}
          />
          <IconButton onClick={handleFilterClick} sx={{ marginLeft: "10px" }}>
            <FilterListIcon />
          </IconButton>
          <Button variant="outlined" startIcon={<AddShoppingCartIcon />} onClick={()=>{navigate('/challenge/orders')}}>
            Orders
          </Button>
        </Box>

        {/* Smoothly show filter options */}
        <Collapse in={showFilter} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              width: "100%",
              mt: 2,
            }}
          >
            <FormControl
              size="small"
              variant="standard"
              sx={{
                minWidth: 120,
                color: "#02216F",
                borderRadius: { xs: "5px", md: "10px" },
                p: "10px",
              }}
            >
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                inputProps={{ "aria-label": "Type filter" }}
                disableUnderline
              >
                {productTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              size="small"
              variant="standard"
              sx={{
                minWidth: 120,
                borderRadius: { xs: "5px", md: "10px" },
                color: "#02216F",
                p: "10px",
              }}
            >
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Sort filter" }}
                disableUnderline
              >
                <MenuItem value="LowToHigh">Price: Low to High</MenuItem>
                <MenuItem value="HighToLow">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Collapse>
      </Box>

      <Divider />

      {filteredProducts.length === 0 ? (
        <Typography
          sx={{ textAlign: "center", fontSize: "18px", color: "#777" }}
        >
          No results found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={12} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductArea;
