import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useGetOrderQuery } from "../../Redux/API/User.Api";
import { format } from 'date-fns';
// Dummy order data
const dummyOrders = [
  {
    orderId: "1720-1234-5678",
    items: "Wireless Earbuds",
    orderPlaced: "May 12, 2023 ",
    status: "Shipped",
  },
  {
    orderId: "1543-8765-4321",
    items: "Men's T-Shirt",
    orderPlaced: "Jun 01, 2023",
    status: "Delivered",
    // action: "View Details",
  },
];

// Order row component
const OrderRow = ({ order, index }) => {
  const navigate = useNavigate();

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
          // bgcolor: "white",
          // border: "2px solid",
          // borderColor: "#02216F",
          border: "1px solid #ccc",
          // boxShadow: "1px 2px #02216F",
          borderRadius: "8px",
          position: "relative",
          boxSizing: "border-box",
          p: "10px",
        }}
      >
        {[
          { label: String(index + 1).padStart(2, "0") }, // Row number
          { label: order?.productDetails?.name }, // Items
          { label: format(new Date( order?.OrderPlaced), "dd MMM yyyy p") }, 
          { label: order?.orderStatus }, 
        ].map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign:'center'

            }}
          >
            <Typography
              sx={{

                width: '100%',
                fontSize: { lg: "16px", sm: "12px", xs: "10px" },
                mr: "20px",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
        <Button
          variant="text"
          color="primary"
          // onClick={() => alert(`Viewing details for ${order.item}`)}
          onClick={() => navigate(`/challenge/orders/${order.orderId}`)}
          sx={{ fontSize: { lg: "16px", sm: "12px", xs: "10px" } }}
        >
          View Details
        </Button>
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
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { lg: "16px", sm: "12px", xs: "12px" },
              mr: "20px",
            }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

const YourOrders = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetOrderQuery();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(data);
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
        fontFamily: "Poppins",
        border: "2px solid",
        borderColor: "#02216F",
        boxShadow: "2px 3px #02216F",
        mb: "10px",
        mr: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "Black",
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontSize: "18px",
          }}
        >
          <LocalGroceryStoreIcon
            sx={{
              width: isSm ? "5%" : "3%",
              height: "auto",
            }}
          />
          Your Orders
        </Typography>
        <Divider orientation="horizontal" />

        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 0,
              gap: "20px",
            }}
          >
            <OrderHeader />
            {data?.orders?.map((order, index) => (
              <OrderRow key={order._id} order={order} index={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default YourOrders;
