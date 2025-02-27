"use client";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chatbot from "./Chatbot";
export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        bottom: 0,

        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Chat
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{}}
      >
        <Typography sx={{ p: 2 }}>
          {" "}
          <Chatbot />
        </Typography>
      </Popover>
    </div>
  );
}
