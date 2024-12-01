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
import { AI_Icon, feedback, IQGemIcon, TShirtImg } from "../../assets";
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
const Shipping = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleBlack = () => {
    navigate("/store");
  };

  const { productId } = useParams();
  const product = products.find((p) => p.name === productId);
  // Form State

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Error State

  // Handle file upload for screenshots
  const handleFileUpload = (event) => {
    const files = event.target.files;
    let updatedScreenshots = [...screenshots];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && file.size < 2 * 1024 * 1024) {
        if (updatedScreenshots.length < 3) {
          updatedScreenshots.push(file);
        } else {
          alert("You can upload a maximum of 3 screenshots.");
          break;
        }
      } else {
        alert("File size should be below 2MB");
      }
    }

    setScreenshots(updatedScreenshots);
  };

  // Form validation and submission
  const handleSubmit = () => {
    // Simulate form submission (e.g., API call)
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);

      // Reset form after successful submission
      setFeedbackType("");
      setFeedbackText("");
      setScreenshots([]);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 3000);
    }, 2000); // Simulate a 2-second delay for submission
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
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
              // textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Product Detail
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid white",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
            p: "10px",
            borderRadius: "10px",
            gap: "10px",
            color: "white",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={product.image}
            height={isSm ? 80 : 100}
            sx={{
              borderRadius: "10px",
            }}
          />
          <Divider orientation="vertical" color={"white"} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
              gap: "5px",
            }}
          >
            <Typography
              variant={isSm ? "body1" : "h4"}
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
              }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#02216F",
                bgcolor: "#FFDA55",
                borderRadius: "5px",
                justifyContent: "center",
              }}
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

        <TextField fullWidth label="Country/Region" value="India" disabled required />
        <TextField fullWidth label="Full Name" required />
        <TextField fullWidth label="Mobile number" type="tel" required />
        <TextField fullWidth label="Pincode" type="number" required />
        <TextField fullWidth label="Flat, House no., Building, Company, Apartment" required />
        <TextField fullWidth label="Area, Street, Sector, Village" required />
        <TextField fullWidth label="Landmark" helperText="e.g. near Apollo hospital" required />
        <TextField fullWidth label="Town/City" required />
        <TextField fullWidth label="State" required />

        {/* Submit Button */}
        <Button
          variant="contained"
          color={submissionSuccess ? "success" : "primary"}
          onClick={handleSubmit}
          disabled={isSubmitting || submissionSuccess}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "Black",
              boxShadow: "2px 3px #FFDA55",
            },
            boxShadow: "2px 3px #FFDA55",
          }}
          startIcon={
            isSubmitting ? (
              <CircularProgress size={20} />
            ) : submissionSuccess ? (
              <CheckCircle sx={{ color: "green" }} />
            ) : null
          }
        >
          {isSubmitting
            ? "Submitting..."
            : submissionSuccess
            ? "Order Successful!"
            : "Place Order"}
        </Button>
      </Box>
    </Box>
  );
};

export default Shipping;
