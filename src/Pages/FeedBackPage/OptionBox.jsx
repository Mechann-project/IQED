import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  TextField,
  Grid,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const TopicBox = styled("div")({
  paddingLeft: "10px",
  marginBottom: "16px",
  overflow: "visible",
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  flexBasis: "80%",
  flexShrink: 0,
  fontWeight: "bold",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    fontWeight: "600",
    "& input": {
      padding: "8px",
      "&::placeholder": {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
}));

const OptionBox = ({ options, setOptions, correctOption, setCorrectOption, explanation, setExplanation,errors }) => {

  console.log("correctOption", correctOption)
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const allOptionsFilled = options.every((option) => option.text.trim() !== "");

  return (
    <>
      <Heading >Options</Heading>
      <TopicBox>
        <Grid container spacing={2} sx={{
          my: "10px" 
        }}>
          {options.map((option, index) => (
            <Grid item xs={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton>
                  <DragIndicatorIcon fontSize="small" />
                </IconButton>
                <CustomTextField
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index].text = e.target.value;
                    setOptions(newOptions);
                  }}
                  error={errors.options && !option.text.trim()}
                  helperText={errors.options && !option.text.trim() ? "Option cannot be empty" : ""}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Correct Option Selection */}
        <Autocomplete
          options={options
            .map((option, index) => ({
              label: `Option ${index + 1}`,
              index: index,
              value: option.text,
            }))
            .filter((opt) => opt.value.trim() !== "")}
          value={`Option ${correctOption ? correctOption.index + 1 : ""}`}
          onChange={(event, newValue) =>
            setCorrectOption(newValue ? newValue : null)
          }
          disabled={!options.every((opt) => opt.text.trim() !== "")}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              label="Correct Option"
              variant="outlined"
              margin="normal"
              error={errors.correctOption}
              helperText={errors.correctOption ? "Please select the correct option" : ""}
            />
          )}
          fullWidth
        />


        {/*    */}
        <CustomTextField
          label="Explanation"
          multiline
          rows={3}
          variant="outlined"
          fullWidth
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          margin="normal"
        />
      </TopicBox>
    </>
  );
};

export default OptionBox;
