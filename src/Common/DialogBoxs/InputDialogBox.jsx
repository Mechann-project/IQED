import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";

const InputDialogBox = ({ open, close, title, content, submitCallBack }) => {
  const [email, setEmail] = React.useState("");

  // Handle input change
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    submitCallBack(email); // Pass email value to callback
    close(); // Close the dialog
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <DialogContentText sx={{ fontSize: "14px" }}>{content}</DialogContentText>
        
        <OutlinedInput
          autoFocus
          required
          name="email"
          placeholder="Email address"
          type="email"
          fullWidth
          sx={{ height: "40px" }}
          value={email} // Bind input value to state
          onChange={handleChange} // Update state on change
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={close} sx={{ color: "#02216F" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            fontWeight: "bold",
            backgroundColor: "#1A49BA",
            overflow: "hidden",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "black",
              transition: "transform 0.3s ease-in-out",
              transform: "translateY(-5px)",
            },
            boxShadow: "2px 3px #FFDA55",
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InputDialogBox.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitCallBack: PropTypes.func.isRequired, // Ensure callback is required
};

export default InputDialogBox;
