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

const OptionBox = () => {
  const [options, setOptions] = useState([
    { id: "1", text: "" },
    { id: "2", text: "" },
    { id: "3", text: "" },
    { id: "4", text: "" },
  ]);
  const [correctOption, setCorrectOption] = useState(null);
  const [explanation, setExplanation] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const allOptionsFilled = options.every((option) => option.text.trim() !== "");

  return (
    <>
      <Heading sx={{ mb: "2%" }}>Options</Heading>
      <TopicBox>
        <Grid container spacing={2}>
          {options.map((option, index) => (
            <Grid item xs={6} key={option.id}>
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
                  variant="outlined"
                  size="small"
                  placeholder={`Option ${index + 1}`}
                  fullWidth
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Correct Option Selection */}
        <Autocomplete
          options={options.map((_, index) => `Option ${index + 1}`)}
          value={correctOption}
          onChange={(event, newValue) => setCorrectOption(newValue)}
          disabled={!allOptionsFilled}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              label="Correct Option"
              variant="outlined"
              margin="normal"
            />
          )}
          fullWidth
        />

        {/* Explanation */}
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
