import Slider from "react-slick";
import { Box } from "@mui/material";
import {CarouselCard} from "../../../Common";
import { YellowDesignSVG } from "../../../assets";
const CarouselBox = () => {
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
      height="100%"
      width="50%"
      id="YellowDesignSVG"
      sx={{
        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/eshikhay-database.appspot.com/o/background%2FYellowDesign.svg?alt=media&token=d514c50d-8a55-417f-9907-d86565e3d53b')`,
        backgroundSize: "cover",
        borderRadius: "10px",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Slider
        {...settings}
        style={{ width: "80%", height: "80%" }}
        arrows={false}
      >
        <CarouselCard>
          Overcome Math Anxiety and Boost Your Memory.
        </CarouselCard>
        <CarouselCard>
          Embrace math challenges as opportunities to grow.
        </CarouselCard>
        <CarouselCard>
          A sharp mind holds the key to unlocking your memory's full potential.
        </CarouselCard>
      </Slider>
    </Box>
  );
};

export default CarouselBox;
