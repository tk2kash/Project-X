import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useNavigate } from "react-router-dom";

const ProjectBox = ({ projectId, name ,  description }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    
    return (
        <Box
            gridColumn="span 2"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.project.main}
            borderRadius="0.55rem"
            onClick={() => navigate(`/project/${projectId}/${name}`)}
            sx={{
                "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                }, }}
        >

            <Typography
            variant="h3"
            fontWeight="600"
            sx={{ color: theme.palette.primary[200] }}
            >
            {name}
            </Typography>
            <FlexBetween gap="1rem">
            <Typography>{description}</Typography>
            </FlexBetween>
        </Box>
    );
};

export default ProjectBox;