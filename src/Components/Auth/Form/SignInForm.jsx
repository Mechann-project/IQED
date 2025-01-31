import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Input, Typography, Link } from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import { SignInvalidSchema } from "../Schema/AuthSchema";
import { FormTextField, InputDialogBox } from "../../../Common";
import toast from "react-hot-toast";
import { useForgetPasswordMutation, useLoginMutation } from "../../../Redux/API/Auth.Api";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../../../Redux/API/User.Api";

const SignInForm = ({ PageSwitch }) => {
  const [open, setOpen] = useState(false);
  const [UserLogin] = useLoginMutation();
  const navigate = useNavigate();
  const [ForgetPassword] = useForgetPasswordMutation();
  const { isLoading } = useGetUserQuery()
  const handlesendEmail = async (email) => {
    toast.promise(
      ForgetPassword({ toEmail: email, url: "http://localhost:5173" }).unwrap(),
      {
        loading: "Sending email...",
        success: (response) => {
          navigate("/"); // Redirect on success
          return response.message || "Password reset email sent successfully!";
        },
        error: (error) => {
          console.error("Error sending email:", error);
          return error?.data?.message || "Something went wrong. Please try again.";
        },
      }
    );
  };
  
  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      await toast.promise(
        UserLogin({ email: values.email, password: values.password }), // Remove .unwrap()
        {
          loading: "Logging in...",
          success: (res) => {
            console.log("res", res.data)
            if (res.data != null && !isLoading) {
              sessionStorage.setItem("token", res.data.token)
              navigate("/Explore");
              return <b>Login successful!</b>;
            } else {
              throw new Error("Unexpected response status");
            }
          },
          error: (error) => {
            console.error("Login error:", error); // Log error for debugging
            return <b>Could not login. Please try again.</b>;
          },
        }
      );

    } catch (error) {
      console.error("Error in login process:", error); // Additional error handling
    }

    setSubmitting(false); // Reset form submitting state
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "20px",
          fontWeight: "800",
          color: "#515151",
          marginBottom: "1rem",
        }}
      >
        SIGN IN
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInvalidSchema}
        onSubmit={handleFormSubmit}
      >
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box display="flex" flexDirection="column" gap={1}>
                <FormTextField field={"email"} placeholder={"Email"} />
                <FormTextField
                  field={"password"}
                  placeholder={"password"}
                  type={"password"}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap={1}
                  mt={1}
                >
                  <Box
                    sx={{
                      fontSize: "12px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link component="button" onClick={() => setOpen(true)} sx={{ fontSize: "12px", textDecoration: 'none' }}>
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: '#1A49BA',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: 'Black',
                        transition: 'transform 0.3s ease-in-out',
                        transform: 'translateY(-5px)',
                      },
                      boxShadow: '2px 3px #FFDA55',
                    }}
                    disabled={formik.isSubmitting}
                    onClick={formik.handleSubmit}
                  >
                    Submit
                  </Button>
                  <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                    Don't have an account?{" "}
                    <span>
                      <Link component="button" sx={{ fontSize: "12px", textDecoration: 'none' }} onClick={PageSwitch}>SignUp</Link>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Form>

          </FormikProvider>

        )}
      </Formik>
      <InputDialogBox
        open={open}
        close={() => setOpen(false)}
        title={"Resert Password"}
        content={
          "Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password."
        }
        submitCallBack={handlesendEmail}
      />
    </Box>
  );
};

export default SignInForm;
