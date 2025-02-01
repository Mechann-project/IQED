import React from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  width: 230,
  borderRadius: 20,
  background: "#02216F",
  padding: 5,
  overflow: "hidden",
  
});

const TopSection = styled(Box)({
  height: 150,
  borderRadius: 15,
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)",
  position: "relative"
});

const Border = styled(Box)({
  borderBottomRightRadius: 10,
  height: 30,
  width: 130,   
  background: "#1b233d",
  position: "relative",
  transform: "skew(-40deg)",
  boxShadow: "-10px -10px 0 0 #1b233d"
});

const BottomSection = styled(CardContent)({
  marginTop: 15,
  padding: "10px 5px",
  textAlign: "center"
});

const StatItem = styled(Box)({
  flex: 1,
  textAlign: "center",
  color: "rgba(170, 222, 243, 0.721)"
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: 20,
  borderLeft: "1px solid rgba(255, 255, 255, 0.126)",
  borderRight: "1px solid rgba(255, 255, 255, 0.126)"
});

const SocialMediaIcons = styled(Box)({
  position: "absolute",
  top: 5,
  right: 10,
  display: "flex",
  gap: "5px"
});

const BrandCard = () => {
  return (
    <StyledCard>
      <TopSection>
        <Border />
        {/* <SocialMediaIcons>
          <IconButton size="small" sx={{ color: "#1b233d", '&:hover': { color: "white" } }}>
            <Facebook />
          </IconButton>
          <IconButton size="small" sx={{ color: "#1b233d", '&:hover': { color: "white" } }}>
            <Twitter />
          </IconButton>
          <IconButton size="small" sx={{ color: "#1b233d", '&:hover': { color: "white" } }}>
            <Instagram />
          </IconButton>
        </SocialMediaIcons> */}
      </TopSection>
      <BottomSection>
        <Typography variant="h6" sx={{ color: "white", letterSpacing: 2 }}>UNIVERSE OF UI</Typography>
        <StatRow>
          <StatItem>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>2626</Typography>
            <Typography variant="caption">UI elements</Typography>
          </StatItem>
          <StatItem>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>100%</Typography>
            <Typography variant="caption">Free for use</Typography>
          </StatItem>
          <StatItem>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>38,631</Typography>
            <Typography variant="caption">Contributors</Typography>
          </StatItem>
        </StatRow>
      </BottomSection>
    </StyledCard>
  );
};

export default BrandCard;
