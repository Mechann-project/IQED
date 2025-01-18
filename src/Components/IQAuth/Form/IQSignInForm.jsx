import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Input, Typography ,Link} from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import { SignInvalidSchema } from "../Schema/IQAuthSchema";
import { FormTextField, InputDialogBox } from "../../../Common";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../../../Redux/API/User.Api";
import { useVerifyUserMutation } from "../../../Redux/API/IQ.Quiz.Api";
import { error } from "pdf-lib";

const IQSignInForm = ({ PageSwitch }) => {
  const [open, setOpen] = useState(false);
  const [UserLogin] = useVerifyUserMutation();
  const navigate = useNavigate();
  const { isLoading } = useGetUserQuery()

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await toast.promise(
        UserLogin({ username: values.username, password: values.password }),
        {
          loading: "Logging in...",
          success: (res) => {
            if (res?.data && !isLoading) {
              sessionStorage.setItem("IQUser", res.data.user._id);
              sessionStorage.setItem("IQUseremail", res.data.user.email);
              sessionStorage.setItem("IQUserusername", res.data.user.name);
  
              console.log(res.data.user._id);
              navigate("/Home");
              return "Login successful!";
            } else if (res?.error?.status === 400) {
              toast.error("You already completed.");
              return "Checking your credentials"; 
            } else {
              toast.error("Incorrect username or password");
              return "Checking your credentials"; 
            }
          },
          error: (error) => {
            console.error("Login error:", error?.response || error.message || error);
            return "Login failed! Please check your credentials and try again.";
          },
        }
      );
    } catch (error) {
      console.error("Error in login process:", error); // Additional error handling
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false); // Reset form submitting state
    }
  };
  
  


  const initialValues = {
    username: "",  
    password: "",
  };
  return (
    <Box
    // sx={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignSelf: 'center',
      
    // }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "20px",
          fontWeight: "800",
          // color: "#515151",
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
              <Box display="flex" flexDirection="column" gap={1} >
              <FormTextField field={"username"} placeholder={"Username"} />
                <FormTextField
                  field={"password"}
                  placeholder={"Password"}
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
                      
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* <Link 
                    component="button"
                    onClick={() => setOpen(true)}
                    variant="body2"
                    sx={{fontSize: "12px",textDecoration: 'none' }}
                    >
                      Forgot your password?
                    </Link> */}
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
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
                  {/* <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                    Don't have an account?{" "}
                    <span>
                      <Link onClick={PageSwitch}>SignUp</Link>
                    </span>
                  </Typography> */}
                </Box>
              </Box>
            </Form>
            <InputDialogBox
              open={open}
              close={() => setOpen(false)}
              title={"Resert Password"}
              content={
                "Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password."
              }
              submitCallBack={null}
            />
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default IQSignInForm;
