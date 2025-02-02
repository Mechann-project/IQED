import React, { useState } from "react";
import { Typography, IconButton, Stack, Box, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { styled } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TopicBox = styled("div")({
  paddingLeft: "10px",
  marginBottom: "16px",
  overflow: "visible", // Ensure dragging is not blocked
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(15),
  flexBasis: "80%",
  flexShrink: 0,
  fontWeight: "bold",
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  margin: "0 0 10px 0",
  "& .MuiOutlinedInput-root": {
    fontWeight: "600",
    "& input": {
      height: "40",
      padding: "8px",
      "&::placeholder": {
        fontSize: theme.typography.pxToRem(12),
      },
    },
  },
}));

const OptionBox = () => {
  const [options, setOptions] = useState([
    { id: "1", text: "Option 1" },
    { id: "2", text: "Option 2" },
    { id: "3", text: "Option 3" },
    { id: "4", text: "Option 4" },
  ]);

  // Handle drag end
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newOptions = Array.from(options);
    const [movedOption] = newOptions.splice(result.source.index, 1);
    newOptions.splice(result.destination.index, 0, movedOption);

    setOptions(newOptions);
  };

  // Handle delete option
  const handleDelete = (id) => {
    setOptions(options.filter((option) => option.id !== id));
  };

  return (
    <>
      <Heading sx={{ mb: "2%" }}>Options</Heading>
      <TopicBox>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="options">
            {(provided) => (
              <Stack spacing={0} ref={provided.innerRef} {...provided.droppableProps}>
                {options.map((option, index) => (
                  <Draggable key={option.id} draggableId={option.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps} // Ensure the draggable area is registered
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          background: snapshot.isDragging ? "#f0f0f0" : "transparent",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {/* 🛠 Fix: Apply dragHandleProps to the IconButton */}
                        {/* <IconButton
                          {...provided.dragHandleProps} // This makes the button the drag handle
                          sx={{ marginRight: "16px", cursor: "grab" }}
                        >
                          <DragIndicatorIcon fontSize="small" />
                        </IconButton> */}
                        <CustomTextField
                          variant="outlined"
                          size="small"
                          placeholder={option.text}
                          fullWidth
                        />

                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
      </TopicBox>
    </>
  );
};

export default OptionBox;
