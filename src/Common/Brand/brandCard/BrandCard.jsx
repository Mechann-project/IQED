import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box, Divider, useTheme, Tooltip, useMediaQuery, } from "@mui/material";
import { IQGemIcon, TShirtImg } from "../../../assets";
import { useSelector } from "react-redux";

const BrandCard = ({ Data,isSideBar}) => {
    console.log("Data",Data)
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down("sm"));
    const UserData = useSelector((state) => state.UserState);
    const userCoin = UserData?.earnings?.iqGems;
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
                    height={isSm ? "200" : "150"}
                    image={TShirtImg}
                    alt="ProductThumile"
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
                    Sponsored by {Data.SponsoredBy}
                </Box>

            </Box>

            <CardContent sx={{
                textAlign: "left", color: "white",
                padding: " 10px 10px 10px 10px",
            }}>
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
                        {Data.topicName}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Typography sx={{ mt: '10px', fontSize: "8px", fontWeight: '500', }}>
                        Total Question : <strong style={{ color: '#FFDA55' }}>{Data.totalQuestions}</strong>
                    </Typography>
                    <Typography sx={{ mt: '10px', fontSize: "8px", fontWeight: '500', }}>
                        Test Time : <strong style={{ color: '#FFDA55' }}>{ Data.time} min</strong>
                    </Typography>
                </Box>
                <Typography sx={{ mt: '10px', fontSize: "10px", fontWeight: 'bold', my: "10px", textAlign: 'justify', letterSpacing: '0.5px', width: '100%' }}>
                    Top {Data.giftCount} players will receive the gift!
                </Typography>
                <Divider sx={{ borderBottomWidth: 2, borderColor: 'white', mb: '10px' }} />
                <Tooltip
                    title={
                        !isAffordable ? "You don't have enough gems to participate in this challenge." : ""
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
                                textTransform: 'none',
                                boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
                                "&:hover": {
                                    backgroundColor: "#E6C200"
                                }
                            }}
                        >
                            <Typography sx={{
                                textAlign: 'center',
                                width: "100%",
                                color: "black",
                                fontSize: '10px',

                                fontWeight: "bold",
                            }}>Accept Challenge</Typography>

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
                                {Data.gemRequired}
                            </Typography>
                        </Button>
                    </span>
                </Tooltip>
            </CardContent>

            {/* Add to Cart Button */}


        </Card>
    );
};

export default BrandCard;
