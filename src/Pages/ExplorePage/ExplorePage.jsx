import { Box, Grid } from '@mui/material'
import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
import { ExploreHeader, LoadingScreen, QuestContainer, Recent } from '../../Components'


const ExplorePage = () => {
  return (
    <Box
    sx={{
        width:'100%'
    }}
    >
        <ExploreHeader/>
        <Recent/>
        <QuestContainer/>
    </Box>
  )
}

export default ExplorePage