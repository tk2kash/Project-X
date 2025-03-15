import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const GroupBox = ({ title, description }) => {
    const theme = useTheme();
    return (
        <Box
            gridColumn="span 2"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={"#a1d99b"}
            borderRadius="0.55rem"
        >

            <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: theme.palette.primary[200] }}
            >
            {title}
            </Typography>
            <FlexBetween gap="1rem">
            <Typography>{description}</Typography>
            </FlexBetween>
        </Box>
    );
};

export default GroupBox;