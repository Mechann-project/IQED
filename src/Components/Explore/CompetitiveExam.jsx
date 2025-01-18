import { Box, Button, Grid, Typography,useMediaQuery,
    useTheme, } from "@mui/material";
import React from "react";

import { GATE, jee, NeetImage } from "../../assets";
import ExamCard from "./ExamCard";

const CompetitiveExam = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.down("md"));
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const isLg = useMediaQuery(theme.breakpoints.down("lg"));
    const exams = [
        {
          name: 'NEET',
          image: NeetImage,
          description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        {
          name: 'JEE',
          image: jee,
          description: 'Lorem ipsum dolor sit amet consectetur.',
        },
        ...(isLg? [] : [{
            name: 'GATE',
            image: GATE,
            description: 'Lorem ipsum dolor sit amet consectetur.',
          },]),
        // ...(isLg? [] : [{
        //     name: 'GATE',
        //     image: NeetImage,
        //     description: 'Lorem ipsum dolor sit amet consectetur.',
        //   },]),
      ];
 
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p:'10px',
          boxSizing: "border-box",
          gap:'20px'
        }}
      >
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", flexGrow: 1 }}>
        Competitive Exams 
        </Typography>
      </Box>
        <Grid container spacing={2}>
        {exams.map((exam) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={exam.name}>
            <ExamCard exam={exam} />
          </Grid>
        ))}
      </Grid>
      </Box>
    
  );
};

export default CompetitiveExam;
