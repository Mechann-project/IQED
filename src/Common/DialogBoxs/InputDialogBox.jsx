import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, Form } from "formik";

import { forgotPasswordSchema } from "../../Components/Auth/Schema/AuthSchema";
import { FormTextField } from "../FormFields";
const InputDialogBox = ({ open, close, title, content, submitCallBack }) => {

  // Handle form submission inside Formik
  const handleSubmit = (values) => {
    submitCallBack(values.email);
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
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
        <Formik
          initialValues={{ email: "" }}
          onSubmit={handleSubmit}
          validationSchema={forgotPasswordSchema}
        >
          <Form>
            <FormTextField
              field="email"
              placeholder="Email address"
              fullWidth
            />
            <DialogActions sx={{ pb: 3, }}>
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
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

InputDialogBox.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitCallBack: PropTypes.func.isRequired,
};

export default InputDialogBox;
