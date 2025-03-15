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
import GetTask from "components/GetTask";
import { useParams } from "react-router-dom";

const SingleProjectPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const { projectId, name } = useParams();
    const [username, setUsernameInput] = useState("");
    const token = useSelector((state) => state.token);



    const handleInputChange = (event) => {
        setUsernameInput(event.target.value);
    };

    const addMembersByUsername = async (projectId, username, token) => {
        try {
          const response = await fetch(`http://localhost:3001/projects/${projectId}/members`, {
            method: "POST",
            headers: {
              
              Authorization: `Bearer ${token}`,
            },
            body: new URLSearchParams({ username }),
          });
      
          const result = await response.json();
      
          return result;
        } catch (err) {
          throw new Error(`Failed to add members to project: ${err.message}`);
        }
      };

      const handleAddMember = async () => {
        try {
          await addMembersByUsername(projectId, username, token);
          setUsernameInput("");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };


    return <Box m="20px">
        <FlexBetween 
          padding="0.5rem 2%" 
          borderRadius="0.55rem" 
          backgroundColor={theme.palette.project.main}
          >
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="20px"
                    color="primaryLight"
                >
                    {name}
                </Typography>
            </FlexBetween>
            <FlexBetween gap="2rem">
                <IconButton onClick={() => navigate(`addtask`)}>
                    <AddCircleOutlineOutlinedIcon/>
                </IconButton>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                        <InputBase
                            placeholder="Add member"
                            value={username}
                            onChange={(event) => setUsernameInput(event.target.value)}
                            sx={{
                                mr: 1,
                                width: "15ch",
                                "& input": {
                                    fontSize: "14px",
                                },
                            }}
                        />
                        <IconButton onClick={handleAddMember} disabled={!username}>
                            <PersonAddAlt1OutlinedIcon />
                        </IconButton>
                </Box>
                                                    
            </FlexBetween>

        </FlexBetween>

        <GetTask userId={_id} projectId={projectId}/>

    </Box>;

};

export default SingleProjectPage;