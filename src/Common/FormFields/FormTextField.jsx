import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const FormTextField = ({ field, ...props }) => {
  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <TextField
      name={field}
      value={values[field]}
      onChange={handleChange}
      error={touched[field] && Boolean(errors[field])}
      helperText={touched[field] && errors[field]}
      fullWidth
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "40px", 
          fontWeight: "600",
          "& input": {
            height: "40", 
            padding: "8px", 
            "&::placeholder": {
              fontSize: "12px",
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default FormTextField;
