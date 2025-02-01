import { Box, styled } from '@mui/material';


const SidebarContainer = styled(Box)({
    width: "100%",
    flexDirection:'column',
    padding:'20px ',
    height:"100%" ,
    boxSizing: "border-box",
    borderRadius: "10px",
    display: "flex",
    overflow:'hidden',
    backgroundColor:'#ffff',
    border:'2px solid #02216F',
    justifyContent:'space-between'

});

export default SidebarContainer