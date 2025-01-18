import { Logout, Person, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResetUser } from "../../../Redux/Slice/UserSlice/UserSlice";
import { useGetUserQuery } from "../../../Redux/API/User.Api";

const MenuBox = ({ open, anchorEl, handleClose }) => {
  const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.clear();
    Cookies.remove('connect.sid');
    dispatch(ResetUser);
    navigate("/auth");
    toast.success("Logout..");
    handleClose();
  };
  const handleAccount = () => {
    navigate("/profile");
    handleClose();
  };
  const handleSettings  = () => {
    navigate("/auth");  
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 25,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleAccount}>
        <Person sx={{ pr: "5px", color: "red" }} /> Account
      </MenuItem>
      <Divider />
      {/* <MenuItem onClick={handleSettings}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem> */}
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default MenuBox;
