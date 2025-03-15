import { Box ,Typography, useMediaQuery, useTheme} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TaskBox from "components/TaskBox";
import FlexBetween from "components/FlexBetween";

const TaskPage = ({}) => {
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const [task, setTasks] = useState([]);
    const theme = useTheme();
    const assigneeId = _id;

    useEffect(() => {
        const fetchTasks = async () => {
          try {
    
            const response = await fetch(`http://localhost:3001/tasks/${assigneeId}/find`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const tasks = await response.json();
            setTasks(tasks);
          } catch (error) {
            console.error(error);
          }
        };
        fetchTasks();
      }, [assigneeId]);
    return(
        <Box m="20px">
            <FlexBetween 
                padding="0.5rem 2%" 
                backgroundColor={theme.palette.task.main}
                borderRadius="0.55rem">
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="20px"
                    color="primaryLight"
                >
                    Tasks
                </Typography>
            </FlexBetween>
            </FlexBetween>
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
                        Todo Tasks
                    </Typography>
                </FlexBetween>

                    <Box
                        overflow="auto"
                        display="grid"
                        gap="20px"
                    >            

                        {task
                        .filter(({status}) => status === "todo")
                        .map(({ _id, title, description, status, assignee ,likes, }) => (
                            <TaskBox key={_id} taskId={_id} title={title} description={description} status={status} assignee={assignee} likes={likes}/>
                        ))}
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
                        In progress Tasks
                    </Typography>
                </FlexBetween>

                    <Box
                        overflow="auto"
                        display="grid"
                        gap="20px"
                    >            

                        {task
                        .filter(({status}) => status === "In-progress")
                        .map(({ _id, title, description, status ,assignee, likes,}) => (
                            <TaskBox key={_id} taskId={_id} title={title} description={description} status={status} assignee={assignee} likes={likes}/>
                        ))}
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
                        Review Tasks
                    </Typography>
                </FlexBetween>

                    <Box
                        overflow="auto"
                        display="grid"
                        gap="20px"
                    >            

                        {task
                        .filter(({status}) => status === "Review")
                        .map(({ _id, title, description, status, assignee ,likes,}) => (
                            <TaskBox key={_id} taskId={_id} title={title} description={description} status={status} assignee={assignee} likes={likes}/>
                        ))}
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
                        Completed Tasks
                    </Typography>
                </FlexBetween>

                    <Box
                        overflow="auto"
                        display="grid"
                        gap="20px"
                    >            

                        {task
                        .filter(({status}) => status === "Completed")
                        .map(({ _id, title, description, status, assignee, likes, }) => (
                            <TaskBox key={_id} taskId={_id} title={title} description={description} status={status} assignee={assignee} likes={likes}/>
                        ))}
                    </Box>
                </Box>
          </Box>
          
        </Box>
    );









};
export default TaskPage;