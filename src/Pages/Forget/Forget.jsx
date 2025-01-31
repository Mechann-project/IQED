import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useNewPasswordMutation } from "../../Redux/API/Auth.Api";
import toast from "react-hot-toast";
import { FormTextField } from "../../Common";
import { Formik, Form, FormikProvider } from "formik";
import { ResetPasswordValidationSchema } from "../../Components/Auth/Schema/AuthSchema";
import { LandingHeader } from "../../Components";


const Forget = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token")?.replace(/"/g, "");
  const [useNewPassword] = useNewPasswordMutation();

  const handleSubmit = async (values) => {
    console.log("values",values)
    try {
      const response = await useNewPassword({
        userid: id,
        token,
        NewPassword: values.password,
      }).unwrap();
      toast.success(response.message || "Password updated successfully!");
      navigate("/"); // Redirect to home page after password reset
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <LandingHeader />
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width:'100%',
          height:'100%'
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "60%", lg: "40%" },
            padding: 4,
            border: "2px solid",
            borderColor: "#02216F",
            backgroundColor: "white",
            boxShadow: "3px 4px #02216F",
            borderRadius: "20px",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "600", color: "#02216F", textAlign: "center" }}
            gutterBottom
          >
            Reset Password
          </Typography>
          <Divider
            sx={{
              bgcolor: "#FFDA55",
              mb: "5%",
              height: "2px",
              width: "100%",
            }}
          />
          <Formik
            validationSchema={ResetPasswordValidationSchema}
            onSubmit={handleSubmit}
            initialValues={{ password: "", confirmPassword: "" }}
          >
            {(formik) => (
              <FormikProvider value={formik}>
                <Form>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <FormTextField
                      field={"password"}
                      placeholder={"Password"}
                      type={"password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormTextField
                      field={"confirmPassword"}
                      placeholder={"Confirm Password"}
                      type={"password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                      helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                  </Box>
                  <Box mt={2} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#FFDA55",
                        color: "#02216F",
                        boxShadow: "2px 3px white",
                        borderRadius: "10px",
                        textTransform: "none",
                        border: "2px solid",
                        borderColor: "#02216F",
                        "&:hover": {
                          color: "#fff",
                          backgroundColor: "black",
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              </FormikProvider>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Forget;
