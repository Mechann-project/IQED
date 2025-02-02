import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { ProductBG, TShirtPNG } from "../../assets";
import { styled } from "@mui/system";
// import {CarouselCard} from "../../../Common";
// import { YellowDesignSVG } from "../../../assets/SVG";
const StatItem = styled(Box)({
  flex: 1,
  textAlign: "center",
  color: "#02216F",
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  justifyContent: 'space-between'
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  // marginTop: 20,
});
const CarouselBox = () => {

  const items = [
    {
      id: 1,
      title: "Grab Upto 50% Off On Selected Headphones",
      img: TShirtPNG,
    },
    {
      id: 2,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
    {
      id: 3,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
    {
      id: 4,
      title: "Up to 30% Off on T-Shirts and More",
      img: TShirtPNG,
    },
  ];


  const challengeData = [
    {
      _id: 1,
      SponsoredBy: "Allreal",
      topicName: "Number Lines",
      totalQuestions: 10,
      time: 10,
      giftCount: 5,
      gemRequired: 10,
      productName: "Water Bottle",
      productDetials: 'Water Bottle | Leakproof | 2 Liter | BPA-Free Plastic',
      thumnail: "https://m.media-amazon.com/images/I/41o9hwA4ORL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      _id: 2,
      SponsoredBy: "IQED",
      topicName: "Speed Math",
      totalQuestions: 50,
      time: 30,
      giftCount: 10,
      gemRequired: 50,
      productName: "American Tourister Bag",
      productDetials: 'American Tourister Valex 28 Ltrs Large Laptop Backpack with Bottle Pocket and Front Organizer- Black',
      thumnail: "https://m.media-amazon.com/images/I/31G4L00mBjL._SY300_SX300_.jpg",
    },
    {
      _id: 3,
      SponsoredBy: "Allreal",
      topicName: "Prime Numbers",
      totalQuestions: 60,
      time: 50,
      giftCount: 8,
      gemRequired: 150,
      productName: "Sketch Pens 24 Colors",
      productDetials: 'KLIFFOO Dual Tip Colorful Art Markers Sketch Pens 24 Colors With Carrying Case',
      thumnail: "https://m.media-amazon.com/images/I/81wQoBSXR2L._SX450_.jpg",
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      // height="100%"

      sx={{
        borderRadius: "10px",
        backgroundColor: 'black',
        height: "200px",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden'
      }}
    >
      <Slider
        {...settings}
        style={{ width: "100%", height: "100%" }}
        arrows={false}
      >
        {challengeData.map((item) => (
          <Box key={item.id} sx={{ width: "100%" }}>
            <Box
              key={item._id}
              sx={{
                backgroundColor: "#FBF0E4",
                padding: { xs: "0 0 0 10px", sm: "0 0 0 20px" },
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "200px",
                gap: "10px",
                width: "100%",
                position: "relative",
              }}
            >
              <Box sx={{ width: '60%', height: '100%' }}>
                <Typography

                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    width: "100%",
                    my: "10px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Limits to 2 lines
                    textOverflow: "ellipsis",
                    fontSize: {
                      xs: "10px", // Small screens
                      sm: "10px", // Medium screens
                      md: "18px", // Large screens
                      lg: "22px", // Extra large screens
                    },
                  }}
                >
                  {item.productDetials}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                    borderLeft: "solid 2px #02216F",
                    pl: "5px",
                    my: "10px",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "8px",
                        sm: "8px",
                        md: "10px",
                        lg: "16px",
                      },
                      mb: "2px",
                    }}
                  >
                    Challenge Topic
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        sm: "10px",
                        md: "15px",
                        lg: "22px",
                      },
                      color: "#02216F",
                      borderRadius: "10px",
                    }}
                  >
                    {item.topicName}
                  </Typography>
                </Box>



              </Box>
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
                Sponsored by {item.SponsoredBy}
              </Box>
              {/* <img
                src={ProductBG}
                alt="Product Background"
                style={{
                  borderRadius: "10px",
                  maxWidth: "100%",
                  right:0,
                  height:'300px',
                  objectFit: "cover",
                  position: "absolute",
                  
                }}
              /> */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '20%', // Corrected 'Width' to 'width'
                flex: 1,
                backgroundColor: 'white'
              }}>
                <Box
                  component="img"
                  src={item.thumnail} // Make sure 'thumnail' is corrected to 'thumbnail'
                  alt="Product"
                  sx={{
                    height: '100%',
                    maxWidth: '60%',
                    objectFit: 'cover',
                    backgroundColor: 'black',
                  }}
                />
              </Box>

            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselBox;
