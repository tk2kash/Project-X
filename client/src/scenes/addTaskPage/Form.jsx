import {
    Box,
    Button,
    InputBase,
    TextField,
    useMediaQuery,
    useTheme,
    MenuItem,
    
  } from "@mui/material";

  import {DateTimePicker} from "@mui/x-date-pickers"
  
  import { useNavigate , useParams} from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { useState, useEffect } from "react";

  
  const Form = () => {
      const dispatch = useDispatch();
      const { palette } = useTheme();
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [assignee, setAssignee] = useState("");
      const navigate = useNavigate();
      const isNonMobile = useMediaQuery("(min-width:600px)")
      const user = useSelector((state) => state.user);
      const token = useSelector((state) => state.token);
      const { setTasks } = require("../../state");
      const { projectId, name } = useParams();
      const [selectedProject, setSelectedProject] = useState("");
      const [deadline, setDeadline] = useState(null);
      const [startdate, setStartdate] = useState(null);


      const fetchProject = async (projectId) => {
        try {
          const response = await fetch(`http://localhost:3001/projects/${projectId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          const project = await response.json();
          console.log(project);
          setSelectedProject(project);
        } catch (error) {
          console.log(error.message);
        }
      };
  
  
      const getUserByUsername = async (userName) => {
        try {
          const response = await fetch(`http://localhost:3001/users/name/${userName}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const users = await response.json();
          console.log(users);
          return users;
        } catch (error) {
          console.log(error.message);
        }
      };

      
      const addTask = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("startDate",startdate);
        formData.append("dueDate",deadline);
        // Get the user by username
        //const assigneeUser = await getUserByUsername(assignee);
        formData.append("assignee", assignee);
      
        formData.append("createdBy", user._id);
        formData.append("project", projectId);
      
        try {
          const addTaskResponse = await fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: new URLSearchParams(formData),
          });
          const addTask = await addTaskResponse.json();
          setTasks(addTask);
          navigate(`/project/${projectId}/${name}`);
        } catch (error) {
          console.log(error.message);
        }
      };

      useEffect(() => {
        fetchProject(projectId);
      }, []);
          
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
                          placeholder="Task Name"
                          name="title"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
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
                      <TextField
                          label="Assignee"
                          select
                          name = "assignee"
                          fullWidth
                          value={assignee || ""}
                          onChange={(event) => setAssignee(event.target.value)}
                          sx={{
                            width: "100%",
                            gridColumn: "span 2",
                            }}
                        >
                          {selectedProject?.members?.map((member) => (
                            <MenuItem key={member._id} value={member._id}>
                              {member.userName}
                            </MenuItem>
                          ))}
                        </TextField>
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
                          onClick={addTask}                    
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
  