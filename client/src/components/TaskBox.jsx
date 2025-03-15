import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Menu, MenuItem } from "@mui/material";
import FlexBetween from "./FlexBetween";
import {useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const TaskBox = ({ taskId, title ,  description , status, assignee, likes}) => {
    const token = useSelector((state) => state.token);
    const {_id} = useSelector((state) => state.user);
    const theme = useTheme();
    const { projectId, name } = useParams();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(likes.length);
    

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(status);

    useEffect(() => {
        setLiked(likes.includes(_id));
        setNumLikes(likes.length);
      }, [likes]);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusChange = async (newStatus) => {
        if (assignee._id !== _id) {
            return;
          }
        
        try {

            const response = await fetch(`http://localhost:3001/tasks/${taskId}/updateStatus`, {
              method: 'PUT',
              headers: {
                 Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',

              },
              body: JSON.stringify({ status: newStatus }),
            });
        
            if (!response.ok) {
              throw new Error('Failed to update task status');
            }
        
            setSelectedStatus(newStatus);
            setAnchorEl(null);
            window.location.reload();
          } catch (error) {
            console.error(error);

          }
    }
    const handleLikeClick = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/tasks/${taskId}/like`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ liked: !liked, userId: _id}),
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to like task");
          }
    
          setLiked(!liked);
          setNumLikes(numLikes + (liked ? -1 : 1)); 
        } catch (error) {
          console.error(error);
        }
    };
    
    return (
        <Box
            gridColumn="span 2"
            gridRow="span 1"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={
                selectedStatus === "todo"
                  ? theme.palette.task.main
                  : selectedStatus === "In-progress"
                  ? theme.palette.task.inProgress
                  : selectedStatus === "Review"
                  ? theme.palette.task.review
                  : theme.palette.task.completed
              }
            borderRadius="0.55rem"
        >

            <Typography
            variant="h3"
            fontWeight="600"
            color = {theme.palette.text.alt}
            sx={{
                "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                }, }}
            onClick={() => navigate(`/project/${taskId}`)}
            >
            {title}
            </Typography>
            <FlexBetween mt="10px" gap="1rem">
            <Typography>{description}</Typography>


            <Box sx={{ 
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: 'pointer',
                "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                },}}>
                <Typography onClick={handleMenuOpen}>{selectedStatus}</Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleStatusChange("todo")}>Todo</MenuItem>
                    <MenuItem onClick={() => handleStatusChange("In-progress")}>In progress</MenuItem>
                    <MenuItem onClick={() => handleStatusChange("Review")}>Review</MenuItem>
                    <MenuItem onClick={() => handleStatusChange("Completed")}>Completed</MenuItem>
                </Menu>
            </Box>

            </FlexBetween>
            <Box
            mt="10px" 
            sx={{ 
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: 'pointer',
                }}>
                <ThumbUpAltIcon
                    onClick={handleLikeClick}
                    sx={{
                        alignItems: "center",
                        color: liked ? theme.palette.primary.main : theme.palette.text.alt,
                    }}

                />
                <Typography>{numLikes}</Typography>
            </Box>
        </Box>
    );
};
export default TaskBox;