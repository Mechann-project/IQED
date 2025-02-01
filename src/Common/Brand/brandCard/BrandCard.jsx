import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box, Divider, useTheme,Tooltip,useMediaQuery,} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IQGemIcon, TShirtImg } from "../../../assets";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomIcon = () => {
    return <img src={IQGemIcon} alt="Custom Icon" style={{ width: '24px', height: '24px' }} />;
};

const BrandCard = () => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const UserData = useSelector((state) => state.UserState);
    const userCoin = 10;
    const isAffordable = userCoin >= 20;
    const [openTooltip, setOpenTooltip] = useState(false);

    const handleCardClick = () => {
        if (!isAffordable) {
          setOpenTooltip(true); 
          setTimeout(() => {
            setOpenTooltip(false);
          }, 2000); 
        }
      };
    
      const handleTooltipClose = () => {
        setOpenTooltip(false);
      };

    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: 3,
                border: "1px solid black",
                backgroundColor: "#1A49BA",
                padding: "10px",
                position: "relative",
                boxSizing: 'border-box',
                overflow: "visible"
            }}
        >
            {/* <Box
                sx={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    zIndex: 2,
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(${IQGemIcon})`,  // Correctly applying the background image
                    backgroundSize: 'cover',  // Ensures the image is scaled correctly to fit the box
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    // border: "2px solid black",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: '900',
                        fontSize: '12px',
                        color: 'white',  // Ensures text is visible over the image
                    }}
                >
                    10
                </Typography>
            </Box> */}


            <Box sx={{ position: "relative", overflow: 'hidden' }}>

                <CardMedia
                    component="img"
                    height="150"
                    image={TShirtImg}
                    alt="Nike Air Force 1"
                    sx={{
                        borderRadius: "10px",
                        border: "2px solid black",
                        backgroundColor: "white",
                        boxSizing: 'border-box',

                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "bold",
                        padding: "2px 6px",
                        borderRadius: "5px",
                    }}
                >
                    Sponsored by AllReal
                </Box>
                
            </Box>

            <CardContent sx={{ textAlign: "left", color: "white", px: '5px',py:'10px' }}>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'left',
                    borderLeft: 'solid 2px #FFDA55',
                    pl: '5px',
                }}>
                    <Typography fontWeight="bold" sx={{
                        fontSize: '8px',
                        mb: '2px',


                    }}>
                        Challenge Topic
                    </Typography>
                    <Typography fontWeight="bold" sx={{
                        fontSize: '15px',
                        // backgroundColor:'#FFD700',
                        color: '#FFDA55',
                        borderRadius: '10px',

                    }}>
                        Number Lines
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ mt: '10px', fontSize: "13px", fontWeight: '500', }}>
                        Total Question : <strong style={{ color: '#FFDA55' }}>10</strong>
                    </Typography>
                    <Typography sx={{ mt: '10px', fontSize: "13px", fontWeight: '500', }}>
                        Test Time : <strong style={{ color: '#FFDA55' }}>10min</strong>
                    </Typography>
                </Box>
                <Typography sx={{mt: '10px', fontSize: "13px", fontWeight: 'bold', my: "10px", textAlign: 'justify',  }}>
                    Top 10 players will receive the gift!
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: 'white' }} />
            </CardContent>

            {/* Add to Cart Button */}
            
            <Tooltip
                title={
                    !isAffordable ? "You don't have enough coins to get this product" : ""
                }
                arrow
                placement="top"
                open={openTooltip}
                onClose={handleTooltipClose}
                disableInteractive
                onMouseEnter={() => setOpenTooltip(true)}
                onMouseLeave={() => setOpenTooltip(false)}
            >
                <span>
                    <Button
                    variant="contained"
                    // component={Link}
                        // to={`/store/shipping/${product.name}`}
                    sx={{
                        width: "100%",
                        backgroundColor: "#FFDA55",
                        color: "black",
                        fontSize: '12px',
                        fontWeight: "bold",
                        borderRadius: "5px",
                        justifyContent: 'space-between',
                        
                        boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                        "&:hover": {
                            backgroundColor: "#E6C200"
                        }
                    }}

                >
                    <Typography   sx={{
                        
                        textAlign:'center',
                        width: "100%",
                        color: "black",
                        fontSize: '12px',
                        fontWeight: "bold",}}>Start the Challenge</Typography>
                    
                    <Typography
                    
                        variant="body"
                        fontWeight="bold"
                        sx={{ display: "flex", alignItems: "center", color: "#02216F", ml: '10px', borderLeft: '2px solid', pl: '10px' }}
                    >
                        <Box
                            component="img"
                            src={IQGemIcon}
                            alt="Gem Icon"
                            sx={{
                                height: "18px",
                                marginRight: "4px",
                            }}
                        />
                        10
                    </Typography>
                </Button>
                </span>
            </Tooltip>
        </Card>
    );
};

export default BrandCard;
