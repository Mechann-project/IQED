import { Box, Button, Typography } from "@mui/material";
import IQSignInForm from "../Form/IQSignInForm";

const IQSignInBox = ({ PageSwitch }) => {
  return (
    <Box
      height="100%"
      width="100%"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
       <IQSignInForm PageSwitch={PageSwitch}/>
    </Box>
  );
};

export default IQSignInBox;
