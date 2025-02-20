import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { IQGemIcon, TShirtImg } from "../../assets";
import { useGetOrderQuery } from "../../Redux/API/User.Api";
import { format } from "date-fns";

// Dummy order data
const dummyOrders = [
  {
    productID: 1,
    orderId: "1720-1234-5678",
    items: "Wireless Earbuds",
    orderPlaced: "May 12, 2023 ",
    status: "Shipped",
    size: null,
  },
  {
    productID: 4,
    orderId: "1543-8765-4321",
    items: "Men's T-Shirt",
    orderPlaced: "Jun 01, 2023",
    status: "Delivered",
    size: "Medium",
  },
];

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
];

const OrderDetail = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { orderId } = useParams();

  const handleBack = () => navigate("/challenge/orders");
 const { data, isLoading } = useGetOrderQuery();
  // Find order details
  const order = data?.orders.find((o) => o.orderId === orderId);


  if (!order) {
    return (
      <Box sx={{ textAlign: "center", p: "20px" }}>
        <Typography variant="h6">Order not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        p: "20px",
        flexGrow: 1,
        bgcolor: "#F3F7FF",
        borderRadius: "10px",
        border: "2px solid",
        borderColor: "#02216F",
        boxShadow: "2px 3px #02216F",
        mb: "10px",
        mr: "5px",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontWeight: "bold",
          color: "Black",
          display: "flex",
          alignItems: "center",
          fontSize: "18px",
          gap: "10px",
        }}
      >
        <ArrowBackIosIcon
          onClick={handleBack}
          sx={{
            color: "black",
            fontSize: "16px",
            cursor: "pointer",
            "&:hover": {
              color: "#FFDA55",
            },
          }}
        />
        <Divider orientation="vertical" sx={{ height: "60%" }} />
        Order Details
      </Typography>

      <Divider orientation="horizontal" />

      {/* Order Details and Product Image */}
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxSizing: "border-box",
          p: "20px",
          gap: "20px",
          flexDirection: isSm ? "column" : "row",
        }}
      >
        {/* Product Image */}
        <Box
          component="img"
          src={order.Image}
          alt={order.productDetails.name}
          sx={{
            borderRadius: "10px",
            width: isSm ? "100%" : "20%",
            height: "auto",
            objectFit: "cover",
          }}
        />

        {/* Order Information Table */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "5px",
            flexGrow: 1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Order ID:
          </Typography>
          <Typography variant="body1">{order.orderId}</Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Order Status:
          </Typography>
          <Typography variant="body1">{order.orderStatus}</Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Order Placed:
          </Typography>
          <Typography variant="body1">{ format(new Date( order?.OrderPlaced), "dd MMM yyyy p") }, </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Item:
          </Typography>
          <Typography variant="body1">{order.productDetails.name} , {order.productDetails.description}</Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          shipping Address:
          </Typography>
          <Typography variant="body1">{order.shippingAddress}</Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Mobile Number:
          </Typography>
          <Typography variant="body1">{order.mobileNumber}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetail;
