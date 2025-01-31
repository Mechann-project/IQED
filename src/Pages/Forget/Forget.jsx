import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNewPasswordMutation } from "../../Redux/API/Auth.Api";
import toast from "react-hot-toast";

const Forget = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // Fixed typo from 'navicate' to 'navigate'

  // Extract token from URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token")?.replace(/"/g, "");

  // State for form fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // RTK Mutation Hook
  const [useNewPassword] = useNewPasswordMutation();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!newPassword || !confirmPassword) {
      toast.error("Both fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Call API and unwrap the response
      const response = await useNewPassword({ userid: id, token, NewPassword: newPassword }).unwrap();

      // Success handling
      toast.success(response.message || "Password updated successfully!");
      navigate("/"); // Redirect to home page
    } catch (error) {
      // Error handling
      console.error("Error updating password:", error);
      toast.error(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          width: "50%",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Reset Password #IQED
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Forget;
