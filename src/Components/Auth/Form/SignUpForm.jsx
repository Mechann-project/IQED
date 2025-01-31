import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Input, Typography, Link } from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";
import { SignUpvalidSchema } from "../Schema/AuthSchema";
import { FormTextField } from "../../../Common";
import { useRegisterMutation, useCheckEmailExistsMutation, useSendEmailOTPMutation, useVerifyEmailMutation } from "../../../Redux/API/Auth.Api";
import toast from "react-hot-toast";


const steps = ["Profile", "Contact Info", "Password"];

const SignUpForm = ({ PageSwitch }) => {
  const [sendEmailOTP, { isLoading: isSendingOTP }] = useSendEmailOTPMutation();
  const [verifyEmailOTP, { isLoading: isVerifyEmailOTP }] = useVerifyEmailMutation();
  const [AddUser] = useRegisterMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [isotpError, setisOtpError] = useState(false);
  const navigate = useNavigate();
  const [otpTimer, setOtpTimer] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleVerifyEmailOTP = async (values) => {
    try {
      const response = await verifyEmailOTP({
        email: values.email,
        otp: values.OTP,
      }).unwrap();

      return response;
    } catch (error) {
      console.error("Failed to verify OTP:", error);
    }
  };

  const handleFormSubmit = useCallback(
    async (values, { setSubmitting }) => {
      if (activeStep === 1) {
        const isverify = await handleVerifyEmailOTP(values);
        console.log(isverify);
        if (isverify) {
          setisOtpError(false);
          toast.success("OTP is Verifed");
          handleNext();
        } else {
          setisOtpError(true);
          toast.error("OTP is wrong");
        }
      } else {
        if (activeStep === steps.length - 1) {
          // alert(JSON.stringify(values, null, 2));
          toast.promise(AddUser(values).unwrap(), {
            loading: "Send...",
            success: () => {
              PageSwitch();
              return <b>New User Added</b>;
            },
            error: <b>Could not Add Try again.</b>,
          });
        } else {
          handleNext();
        }
      }
      setSubmitting(false);
    },
    [activeStep]
  );

  const initialValues = {
    profileImage: "",
    userName: "",
    name: "",
    age: "",
    email: "",
    password: "",
    schoolName: "",
    grade: "",
    OTP: "",
  };

  const handleProfileImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendOtp = async (email) => {
    if (!email) {
      alert("Please enter a valid email address first.");
      return;
    }

    try {
      await toast.promise(sendEmailOTP({ email }).unwrap(), {
        loading: "Sending...",
        success: <b>OTP has been sent to your email.</b>,
        error: <b>Could not send. Try again.</b>,
      });

      setOtpSent(true);
      setisOtpError(false);
      setOtpTimer(60); // Set timer to 60 seconds

      // Start countdown
      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);
      setisOtpError(true);
    }
  };


  return (
    <Box mt={2}>
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
        CREATE ACCOUNT
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpvalidSchema[activeStep]}
        onSubmit={handleFormSubmit}
      >
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box display="flex" flexDirection="column" gap={1}>
                {activeStep === 0 && (
                  <>
                    <FormTextField
                      field={"userName"}
                      placeholder={"UserName"}
                    />
                    <FormTextField field={"name"} placeholder={"Name"} />
                    <FormTextField field={"age"} placeholder={"Age"} />
                    <FormTextField
                      field={"schoolName"}
                      placeholder={"SchoolName"}
                    />
                    <FormTextField field={"grade"} placeholder={"Grade"} />
                  </>
                )}

                {activeStep === 1 && (
                  <>
                    <FormTextField field={"email"} placeholder={"Email"} />
                    {otpSent ? (
                      otpTimer > 0 ? (
                        <Typography variant="body2" sx={{ mt: 1, color: "#1A49BA", fontWeight: "bold" }}>
                          Resend OTP in <b>{otpTimer} sec</b>
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, color: "#1A49BA", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
                          onClick={() => sendOtp(formik.values.email)}
                        >
                          Didn't receive the OTP? Click here to resend.
                        </Typography>
                      )
                    ) : (
                      <Button
                        type="button"
                        variant="contained"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "#1A49BA",
                          color: "#ffffff",
                          mt: "10px",
                          "&:hover": { backgroundColor: "black" },
                          boxShadow: "2px 3px #FFDA55",
                        }}
                        onClick={() => sendOtp(formik.values.email)}
                        disabled={isSendingOTP}
                      >
                        {isSendingOTP ? "SENDING..." : "SEND OTP"}
                      </Button>
                    )}

                    {otpSent && (
                      <FormTextField
                        field={"OTP"}
                        placeholder={"OTP"}
                        error={isotpError || Boolean(formik.errors.OTP)}
                        helperText={isotpError || formik.errors.OTP}
                      />
                    )}
                  </>
                )}

                {activeStep === 2 && (
                  <>
                    {/* <Input
                      type="file"
                      name="profileImage"
                      onChange={(event) =>
                        handleProfileImageChange(event, formik.setFieldValue)
                      }
                      error={
                        formik.touched.profileImage &&
                        Boolean(formik.errors.profileImage)
                      }
                      inputProps={{ accept: "image/*" }}
                    />
                    {formik.touched.profileImage &&
                      formik.errors.profileImage && (
                        <div style={{ color: "red" }}>
                          {formik.errors.profileImage}
                        </div>
                      )} */}

                    <FormTextField
                      field={"password"}
                      placeholder={"Password"}
                      type={"password"}
                    />
                    <FormTextField
                      field={"confirmPassword"}
                      placeholder={"Confirm Password"}
                      type={"password"}
                    />
                  </>
                )}

                <Box display="flex" flexDirection="column" gap={1} mt={1}>
                  <Box>
                    <Typography
                      component="p"
                      sx={{ fontSize: "12px", fontWeight: "bold" }}
                    >
                      By clicking 'Next,' you agree to our
                      <Link component="button" onClick="#" sx={{ marginLeft: "4px" }}> Terms and Conditions.</Link>
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'row-reverse',
                    gap: '20px'
                  }}>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#1A49BA',
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: 'Black',

                          },
                          boxShadow: '2px 3px #FFDA55',
                        }}
                        disabled={formik.isSubmitting}
                        onClick={formik.handleSubmit}
                      >
                        Submit
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#1A49BA',
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: 'Black',

                          },
                          boxShadow: '2px 3px #FFDA55',
                        }}
                        onClick={formik.handleSubmit}
                      >
                        Next
                      </Button>
                    )}
                    {activeStep === 0 ?
                      null : <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="contained"
                        fullWidth
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#1A49BA',
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: 'Black',

                          },
                          boxShadow: '2px 3px #FFDA55',
                        }}
                      >
                        Back
                      </Button>}

                  </Box>
                  <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
                    I have an account?{" "}
                    <span>
                      <Link component="button" sx={{ fontSize: "12px", textDecoration: 'none' }} onClick={PageSwitch}>SignIn</Link>
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Form>
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;
