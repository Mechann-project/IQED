import { Box } from "@mui/material";
import React from "react";
import AuthContainer from "../../Components/Auth/AuthContainer";
import IQAuthContainer from "../../Components/IQAuth/IQAuthContainer";

const IQAuthPage = () => {
  return (
    <Box
      sx={{
        height:'100%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    
    >
      <IQAuthContainer />
    </Box>
  );
};

export default IQAuthPage;
