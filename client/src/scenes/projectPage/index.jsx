import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import GetProject from "components/GetProject";

const ProjectPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);

    return <Box m="20px">
        <FlexBetween padding="0.5rem 2%" borderRadius="0.55rem" backgroundColor={theme.palette.project.main}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="20px"
                    color="primaryLight"
                >
                    Projects
                </Typography>
            </FlexBetween>
            <FlexBetween gap="2rem">
                <IconButton onClick={() => navigate("/addproject")}>
                    <AddCircleOutlineOutlinedIcon/>
                </IconButton>
            </FlexBetween>

        </FlexBetween>
        
        <GetProject userId={_id}/> 
    </Box>;

};

export default ProjectPage;
