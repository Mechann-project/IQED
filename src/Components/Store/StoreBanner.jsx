import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import { ProductBG, TShirtPNG } from "../../assets";
// import {CarouselCard} from "../../../Common";
// import { YellowDesignSVG } from "../../../assets/SVG";

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
      SponsoredBy: "Allreal",
      topicName: "Number Lines",
      totalQuestions: 10,
      time: 10,
      giftCount: 5,
      gemRequired: 20,
      productDetials:'Water Bottle | Leakproof | 2 Liter | BPA-Free Plastic Included Silicone Pipe (Purple)',
      thumnail: "https://m.media-amazon.com/images/I/41o9hwA4ORL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      SponsoredBy: "IQED",
      topicName: "Speed Math",
      totalQuestions: 50,
      time: 30,
      giftCount: 10,
      gemRequired: 50,
    },
    {
      SponsoredBy: "Allreal",
      topicName: "Prime Numbers",
      totalQuestions: 60,
      time: 50,
      giftCount: 8,
      gemRequired: 150,
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
        {items.map((item) => (
          <Box key={item.id} sx={{ width: "100%" }}>
            <Box
              key={item.id}
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
                position: "relative",
              }}
            >
              <Box sx={{ flex: 1, width:'80%'}}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  {item.title}
                </Typography>

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
                Sponsored by Allreal
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
              <Box
                component="img"
                src={item.img}
                alt="Product"
                sx={{
                  height: '100%',
                  maxWidth: "100%",
                  objectFit: "cover",
                  // position: "absolute",
                  backgroundColor: 'black',
                  // zIndex: 2,
                  // borderRadius: "50px",
                }}
              />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselBox;
