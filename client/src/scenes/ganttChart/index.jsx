import { Task, ViewMode, Gantt } from "gantt-task-react";
import {Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GanttChart = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const currentDate = new Date();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [events, setEvents] = useState([]);
    const assigneeId = _id;
    const userId = _id;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await fetch(`http://localhost:3001/tasks/${assigneeId}/find`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const tasks = await response.json();
            const response2 = await fetch(`http://localhost:3001/projects/${userId}/projects`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            const projects = await response2.json();
            console.log(projects);
            
            const projectEvents = projects.flatMap(project => {
                const setStartDate2 = new Date(project.startDate);
                const setDueDate2 = new Date(project.dueDate);
                const startDate2 = setStartDate2 ? new Date(setStartDate2.getFullYear(), setStartDate2.getMonth(), setStartDate2.getDate()) : null;
                const dueDate2 = setDueDate2 ? new Date(setDueDate2.getFullYear(), setDueDate2.getMonth(), setDueDate2.getDate()) : null;
              
                const projectEvent = {
                  start: startDate2,
                  end: dueDate2,
                  name: project.name,
                  id: project._id,
                  progress: 25,
                  type: "project",
                  hideChildren: false,
                  styles: { progressColor: '#ffffff', barBackgroundBackgroundColor: "#deebf7" },
                };
              
                const taskEventsForProject = tasks
                  .filter(task => task.project._id === project._id)
                  .map(task => {
                    const progress = task.status === "todo" ? 0 : task.status === "Review" ? 90 : task.status === "Completed" ? 100 : 45;
              
                    const setStartDate = new Date(task.startDate);
                    const setDueDate = new Date(task.dueDate);
                    const startDate = setStartDate ? new Date(setStartDate.getFullYear(), setStartDate.getMonth(), setStartDate.getDate()) : null;
                    const dueDate = setDueDate ? new Date(setDueDate.getFullYear(), setDueDate.getMonth(), setDueDate.getDate()) : null;
                    return {
                      start: startDate,
                      end: dueDate,
                      name: task.title,
                      dependencies: [project._id],
                      id: task._id,
                      progress: progress,
                      type: "task",
                      project: project.name,
                      styles: { barBackgroundColor: theme.palette.task.main, },
                    };
                  });
              
                return [projectEvent, ...taskEventsForProject];
              });
                
            const events = projectEvents;
            console.log(events);
    
            setTasks(tasks);
            setEvents(events);
            setProjects(projects);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); 
            }
        };
    
        fetchTasks();
      }, []);

      if (isLoading) {
        // show loading spinner or message
        return <div className="spinner">loading</div>;
      }
    
      if (events.length === 0) {
        // show empty state or error message
        return <div>No tasks found</div>;
      }

      const handleExpanderClick = (event) => {
        console.log(event);
        setEvents(events.map(e => (e.id === event.id ? event : e)));
        console.log("On expander click Id:" + event.id);
      };



    return(
    <Box mt="20px"
    padding="0.5rem 2%">
        <Typography fontWeight={500} variant="h5" sx={{mb: "1.5rem"}}>
            Gantt Chart
        </Typography>

    <Box display="flex" justifyContent="space-between">
    

        <Box 
            display="flex" 
            justifyContent="space-between" 
            flexDirection="column" 
            overflow="auto"
            flex="1 1 100%"
            width="1000px"
            sx={{ backgroundColor: theme.palette.background.alt,
                backgroundSelectedColor:theme.palette.background.default,
                ".gantt-task-list": {
                    fontSize: "16px",
                    color: theme.palette.text.alt,
                  },
                "._34SS0:nth-of-type(even)": {
                    backgroundColor: theme.palette.background.default,
                  },
                "._35nLX":{
                    fill: theme.palette.background.alt,
                },
                "._9w8d5":{
                    fill: theme.palette.text.alt,
                },
                "._2dZTy:nth-child(even)": {
                    fill: theme.palette.background.default,
                },
                "._2dZTy": {
                    fill: theme.palette.background.alt,
                },
                
            }}
        >
            <Gantt 
                tasks={events}
                columnWidth={60}
                overflow= "auto"
                listCellWidth={"150px"}
                onExpanderClick={handleExpanderClick}
                todayColor={'rgba(0, 0, 255, 0.06)'}

            />
        </Box>    
    </Box>

    </Box>
    );

};

export default GanttChart;