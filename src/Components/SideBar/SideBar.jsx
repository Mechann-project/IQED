import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import {
  ProgressCard,
  SidebarContainer,
} from "../../Common";
import { IQCoinIcon, IQGemIcon, IQRankIcon } from "../../assets/Image";
import { useSelector } from "react-redux";
import { useGetChallengeQuery, useGetUserQuery } from "../../Redux/API/User.Api";
import DandFQuests from "../Quest/DandFQuests";
import BrandCard from "../../Common/Brand/brandCard/BrandCard";

const SideBar = () => {
  const UserData = useSelector((state) => state.UserState);
  const theme = useTheme();
  const { data, error, isLoading } = useGetUserQuery();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const UserId = sessionStorage.getItem("UserId");

  const iqGems = useMemo(() => UserData?.earnings?.iqGems || 0, [UserData]);
  const xpCoins = useMemo(() => UserData?.earnings?.xp || 0, [UserData]);
  const rank = useMemo(() => UserData?.earnings?.rank || 0, [UserData]);

  const [previousXp, setPreviousXp] = useState(xpCoins);
  const [previousIqGems, setPreviousIqGems] = useState(iqGems);
  const [previousRank, setPreviousRank] = useState(rank);
  const { data: ChallengeData, isSuccess: Loading } = useGetChallengeQuery();
 

  const [animateXp, setAnimateXp] = useState(false);
  const [animateIqGems, setAnimateIqGems] = useState(false);
  const [animateRank, setAnimateRank] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Track changes for XP coins
  useEffect(() => {
    if (xpCoins !== previousXp) {
      setAnimateXp(true);
      setPreviousXp(xpCoins);
    } else {
      setAnimateXp(false);
    }
  }, [xpCoins, previousXp]);

  // Track changes for IQ Gems
  useEffect(() => {
    if (iqGems !== previousIqGems) {
      setAnimateIqGems(true);
      setPreviousIqGems(iqGems);
    } else {
      setAnimateIqGems(false);
    }
  }, [iqGems, previousIqGems]);

  // Track changes for Rank
  useEffect(() => {
    if (rank !== previousRank) {
      setAnimateRank(true);
      setPreviousRank(rank);
    } else {
      setAnimateRank(false);
    }
  }, [rank, previousRank]);

  const challengeData = [
    {
      _id:1,
      SponsoredBy: "Allreal",
      topicName: "Number Lines",
      totalQuestions: 10,
      time: 10,
      giftCount: 5,
      gemRequired: 10,
      productName:"Water Bottle",
      productDetials:'Water Bottle | Leakproof | 2 Liter | BPA-Free Plastic',
      thumnail: "https://m.media-amazon.com/images/I/41o9hwA4ORL._SX300_SY300_QL70_FMwebp_.jpg",
    },
    {
      _id:2,
      SponsoredBy: "IQED",
      topicName: "Speed Math",
      totalQuestions: 50,
      time: 30,
      giftCount: 10,
      gemRequired: 50,
      productName:"American Tourister Bag",
      productDetials:'American Tourister Valex 28 Ltrs Large Laptop Backpack with Bottle Pocket and Front Organizer- Black',
      thumnail: "https://m.media-amazon.com/images/I/31G4L00mBjL._SY300_SX300_.jpg",
    },
    {
      _id:3,
      SponsoredBy: "Allreal",
      topicName: "Prime Numbers",
      totalQuestions: 60,
      time: 50,
      giftCount: 8,
      gemRequired: 150,
      productName:"Sketch Pens 24 Colors",
      productDetials:'KLIFFOO Dual Tip Colorful Art Markers Sketch Pens 24 Colors With Carrying Case',
      thumnail: "https://m.media-amazon.com/images/I/81wQoBSXR2L._SX450_.jpg",
    }
  ];
  return (
    <SidebarContainer >
      {/* <ProgressCard icon={IQGemIcon} title="IQ Gems" Count={iqGems} animate={animateIqGems} delay={0.5} />
      <ProgressCard icon={IQCoinIcon} title="XP+ Coin" Count={xpCoins} animate={animateXp} delay={1} />
      <ProgressCard icon={IQRankIcon} title="Rank" Count={rank} animate={animateRank} delay={1.5} /> */}
      <DandFQuests/>
      {Loading && <BrandCard Data={ChallengeData?.challenges[0]}/>}
    </SidebarContainer>
  );
};

export default SideBar;
