import {
  Box,
  Button,
  InputBase,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {DateTimePicker} from "@mui/x-date-pickers"

const Form = () => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const [name, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)")
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { setProjects } = require("../../state");
    const [deadline, setDeadline] = useState(null);
    const [startdate, setStartdate] = useState(null);


    const addProject = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("members", [user._id]);
        formData.append("createdBy", user._id);
        formData.append("startDate",startdate);
        formData.append("dueDate",deadline);
      
        try {
            const addProjectResponse = await fetch("http://localhost:3001/projects", {
              method: "POST",
              headers: { 
                Authorization: `Bearer ${token}` },
              body: new URLSearchParams(formData),
            });
            const addProject = await addProjectResponse.json();
            setProjects(addProject);
            navigate("/project");
        } catch (error) {
            console.log(error.message);
        }
    };


    return (<Box>
                <Box
                display="grid"
                gap="40px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
                }}
                >

                    <InputBase
                        placeholder="ProjectName"
                        name="name"
                        value={name}
                        onChange={(event) => setProjectName(event.target.value)}
                        sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        gridColumn: "span 2",
                        }}
                    />
                    <InputBase
                        placeholder="Description"
                        name="description"
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        gridColumn: "span 2",
                        }}
                    />
                     <DateTimePicker
                        label="Startdate"
                        inputFormat="yyyy-MM-dd hh:mm a"
                        value={startdate}
                        onChange={(newStartdate) => setStartdate(newStartdate)}
                        disablePast
                        fullWidth
                        sx={{
                            width: "100%",
                            gridColumn: "span 2",
                        }}
                    />
                    <DateTimePicker
                        label="Deadline"
                        inputFormat="yyyy-MM-dd hh:mm a"
                        value={deadline}
                        onChange={(newDeadline) => setDeadline(newDeadline)}
                        disablePast
                        fullWidth
                        sx={{
                            width: "100%",
                            gridColumn: "span 2",
                        }}
                    />

                </Box>

                <Box>
                    <Button
                        onClick={addProject}                    
                        fullWidth
                        type="submit"
                        sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: palette.neutral.medium,
                        color: palette.neutral.light,
                        "&:hover": { color: palette.neutral.dark },
                        }}
                    >
                        Add
                    </Button>
                   
                </Box> 
            </Box>
    );
};

export default Form;