import React, { useState } from "react";
import { TShirtImg } from "../../assets";
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
} from "@mui/material";
import ProductCard from "./ProductCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FilterListIcon from "@mui/icons-material/FilterList";

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
  {
    id: 5,
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
    id: 6,
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

  const [selectedType, setSelectedType] = useState("All Types");
  const [sortOrder, setSortOrder] = useState("HighToLow");
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique product types
  const productTypes = [
    "All Types",
    ...new Set(products.map((product) => product.type)),
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Filter by type
      const matchesType = selectedType === "All Types" || product.type === selectedType;

      // Filter by search query (case insensitive)
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "LowToHigh") {
        return a.discountedPrice - b.discountedPrice;
      } else if (sortOrder === "HighToLow") {
        return b.discountedPrice - a.discountedPrice;
      }
      return 0; // No sorting
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
        {/* Search Bar, Filter Icon, and Cart Icon */}
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
          <Typography sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <AddShoppingCartIcon />
            Cart
          </Typography>
        </Box>

        {/* Show selected filter below the search bar when filter icon is clicked */}
        {showFilter && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              width: "100%",
            }}
          >
            {/* Type Filter */}
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

            {/* Sort By Filter */}
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
        )}
      </Box>

      <Divider />

      {/* Show "No Results Found" if no products match the search/filter criteria */}
      {filteredProducts.length === 0 ? (
        <Typography sx={{ textAlign: "center", fontSize: "18px", color: "#777" }}>
          No results found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductArea;
