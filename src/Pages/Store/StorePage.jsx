import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ProductArea, StoreBanner } from "../../Components";

const StorePage = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display:'flex',
        flexDirection: "column",
        flexGrow: 1,
        gap: "20px",
      }}
    >
      <StoreBanner />
      <ProductArea />
    </Box>
  );
};

export default StorePage;
