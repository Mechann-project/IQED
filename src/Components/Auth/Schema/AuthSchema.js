import * as yup from "yup";
import { useCheckEmailExistsMutation } from "../../../Redux/API/Auth.Api";

export const SignUpvalidSchema = [
  yup.object().shape({
    userName: yup
      .string()
      .required("UserName is required")
      .min(8, "UserName must be at least 8 characters long")
      .test("UserName", "Email already exists", async (value) => {
        if (!value) return true; // Skip the check for empty values
        try {
          // const response = await fetch(`https://iqed-backend.vercel.app/auth/checkEmailExists?email=${value}`, {
          const response = await fetch(`http://localhost:3000/auth/checkUserNameExists?UserName=${value}`, {
            method: "POST",
          });
          // const response = await useCheckEmailExistsMutation({email:value}).unwrap();
          return (response.status == 200 ? false : true); // Adjust based on your backend response
        } catch (error) {
          console.error("Error checking email:", error);
          return false;
        }
      }),
    name: yup.string().required(),
    parentsName: yup.string().required(),
    phoneNo: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    age: yup
      .string()
      .required("Age is required")
      .matches(/^\d{2}$/, "Age must be exactly 2 digits"),
    schoolName: yup.string().required("This field is required"),
    grade: yup.string().required(),
    
  }),
  yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .test("check-email", "Email already exists", async (value) => {
        if (!value) return true; // Skip the check for empty values
        try {
          // const response = await fetch(`https://iqed-backend.vercel.app/auth/checkEmailExists?email=${value}`, {
          const response = await fetch(`http://localhost:3000/auth/checkEmailExists?email=${value}`, {
            method: "POST",
          });
          // const response = await useCheckEmailExistsMutation({email:value}).unwrap();
          return (response.status == 200 ? false : true); // Adjust based on your backend response
        } catch (error) {
          console.error("Error checking email:", error);
          return false;
        }
      }),
    OTP: yup
      .string()
      .required("OTP is required")
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
    // contactNumber: yup
    //   .string()
    //   .required("Contact Number is required")
    //   .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits"),
  }),

  yup.object().shape({
    // profileImage: yup.string().required("File is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  }),
];

export const SignInvalidSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
});
