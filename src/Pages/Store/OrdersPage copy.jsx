import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

// Dummy order data
const dummyOrders = [
  {
    orderId: "1920-9023-9143",
    items: "LeetCode Kit",
    orderPlaced: "Apr 18, 2023 8:12 AM",
    status: "Processing",
    action: "View Details",
  },
  {
    orderId: "1720-1234-5678",
    items: "Wireless Earbuds",
    orderPlaced: "May 12, 2023 3:15 PM",
    status: "Shipped",
    action: "View Details",
  },
  {
    orderId: "1543-8765-4321",
    items: "Men's T-Shirt",
    orderPlaced: "Jun 01, 2023 11:30 AM",
    status: "Delivered",
    action: "View Details",
  },
];

// Order row component
const OrderRow = ({ order, index }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          bgcolor: "white",
          border: "2px solid",
          borderColor: "#02216F",
          boxShadow: "1px 2px #02216F",
          borderRadius: "8px",
          fontWeight: "bold",
          position: "relative",
          boxSizing: "border-box",
          p: "10px",
        }}
      >
        {[
          { label: String(index + 1).padStart(2, "0") }, // Row number
          { label: order.items }, // Items
          { label: order.orderPlaced }, // Order placed date
          { label: order.status }, // Status
          { label: order.action }, // Action
        ].map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Header row for the order table
const OrderHeader = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "end",
    }}
  >
    <Box
      sx={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        bgcolor: "#1A49BA",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        p: "10px",
        boxSizing: "border-box",
      }}
    >
      {[
        { label: "#" },
        { label: "Items" },
        { label: "Order Placed" },
        { label: "Status" },
        { label: "Action" },
      ].map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>{item.label}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const OrdersPage1 = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleBack = () => navigate("/challenge");

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
            onClick={handleBack}
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
            Store / Order Details
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
          Order Information
        </Typography>
        <Divider orientation="horizontal" />
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 0,
              gap:'20px'
            }}
          >
            <OrderHeader />
            {dummyOrders.map((order, index) => (
              <OrderRow key={order.orderId} order={order} index={index} />
            ))}
          </Box>
          
          {/* <Box
            sx={{
              p: isSm ? "10px" : "20px",
              overflowX: "auto",
              overflowY: "auto",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              borderTopWidth: "2px",
              borderStyle: "solid",
              borderColor: "#02216F",
              flexGrow: 1,
              borderRadius: "10px",
              gap: "5px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
           
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersPage1;
