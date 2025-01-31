import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormikContext } from "formik";

const FormTextField = ({ field, type, ...props }) => {
  const { values, errors, touched, handleChange } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      name={field}
      value={values[field]}
      onChange={handleChange}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field]}
      fullWidth
      variant="outlined"
      type={type === "password" && !showPassword ? "password" : "text"}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "40px",
          fontWeight: "600",
          "& input": {
            padding: "8px",
            "&::placeholder": {
              fontSize: "12px",
            },
          },
        },
      }}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                    {showPassword ? <VisibilityOff  fontSize="inherit" /> : <Visibility fontSize="inherit" />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      {...props}
    />
  );
};

export default FormTextField;
