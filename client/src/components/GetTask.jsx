import { Box ,Typography, useMediaQuery, useTheme} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TaskBox from "./TaskBox";
import FlexBetween from "./FlexBetween";
import ChatRoom from "./ChatRoom";
import io from 'socket.io-client';


const GetTask = ({ userId, projectId}) => {
  const token = useSelector((state) => state.token);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [task, setTasks] = useState([]);
  const [mytask, setMyTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const theme = useTheme();
  const assigneeId = userId;
  const socket = io('http://localhost:3002', {
    cors: {
      origin: '*',
      credentials: true
    }
  });

  const fetchProjects = async () => {
    const response = await fetch(
      `http://localhost:3001/tasks/projects/${projectId}/tasks`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setTasks(data);
  };

  const fetchTasks = async () => {
    try {

      const response = await fetch(`http://localhost:3001/tasks/${assigneeId}/${projectId}/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const tasks = await response.json();
      setMyTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMembers = async () => {
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


  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchMembers();
  }, []);


  return (
    <>
      <Box>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="150px"
          gap="20px"
          sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          }}
          >
          <Box
          gridColumn="span 3"
          gridRow="span 5"
          overflow="auto"
          display="flex"
          flexDirection="column"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gap="20px"
          >
            <FlexBetween>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
                Team Tasks
              </Typography>

  
            </FlexBetween>

          <Box
            overflow="auto"
            display="grid"
            gap="20px"
          >            

          {task.map(
            ({
              _id,
              title,
              description,
              status,
              assignee,
              likes,
            }) => (
              <TaskBox
                key={_id}
                taskId={_id}
                title={title}
                description={description}
                status = {status}
                assignee={assignee}
                likes={likes}
              />
            )
          )}
          </Box>
          </Box>
          <Box
          gridColumn="span 3"
          gridRow="span 5"
          overflow="auto"
          display="flex"
          flexDirection="column"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gap="20px"
          >
            <FlexBetween>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
                My Tasks
              </Typography>
            </FlexBetween>            
            <Box
              overflow="auto"
              display="grid"
              gap="20px"
            >
            {mytask.map(
              ({
                _id,
                title,
                description,
                status,
                assignee,
                likes,
              }) => (
                <TaskBox
                  key={_id}
                  taskId={_id}
                  title={title}
                  description={description}
                  status = {status}
                  assignee={assignee}
                  likes={likes}
                />
              )
            )}
            </Box>
          </Box>
          <Box
          gridColumn="span 4"
          gridRow="span 5"
          display="flex"
          flexDirection="column"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gap="20px"
          >
            <FlexBetween>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
                Chat Room
              </Typography>
            </FlexBetween> 

            <Box
              overflow="auto"
              display="grid"
              gap="20px"
              flex="1 1 100%"
            > 

              <ChatRoom socket={socket} projectId={projectId} />

            </Box>
          </Box>



          <Box
          gridColumn="span 2"
          gridRow="span 5"
          overflow="auto"
          display="flex"
          flexDirection="column"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          gap="20px"
          >
            <FlexBetween>
              <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
                Members
              </Typography>
            </FlexBetween>            
            <Box
              overflow="auto"
              display="grid"
              gap="20px"
            >
            <Box>
            {selectedProject?.members?.map((member) => (
                              <FlexBetween key={member._id} value={member._id}>
                                {member.userName}
                              </FlexBetween> 
                            ))}
            </Box>
            </Box>
          </Box>         



        </Box>
      </Box>      
    </>
  );
};

export default GetTask;