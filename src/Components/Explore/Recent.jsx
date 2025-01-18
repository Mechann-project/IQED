
import { Box, Typography,Grid,} from "@mui/material";
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import RecentLevelDetails from "../../Pages/MissionPage/RecentLevelDetails";
import LoadingScreen from "../Loading/LoadingScreen";
import { useSelector } from "react-redux";
// const RecentLevelDetails = lazy(() => import("../MissionPage/RecentLevelDetails"));
const Recent = () => {
    const UserData = useSelector((state) => state.UserState);
    return (
        <Box width={'100%'}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{mb:'30px'}}>
                Current Mission
            </Typography>
            <Suspense fallback={<LoadingScreen />}>
                <Grid item xs={12} lg={12}>
                    <RecentLevelDetails />
                </Grid>
            </Suspense>
        </Box>
    );
};

export default Recent;
