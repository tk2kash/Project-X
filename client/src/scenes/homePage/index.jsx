
import React from "react";
import { ResponsivePie } from '@nivo/pie'
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";


const HomePage = () => {
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

        const todoTasks = task.filter(t => t.status === 'todo');
        const inProgressTasks = task.filter(t => t.status === 'In-progress');
        const reviewTasks = task.filter(t => t.status === 'Review');
        const completedTasks = task.filter(t => t.status === 'Completed');
        console.log(todoTasks)

        const data = [
        {
            id: 'Todo',
            label: 'Todo',
            value: todoTasks.length,
            color: theme.palette.task.main,
        },
        {
            id: 'In progress',
            label: 'In Progress',
            value: inProgressTasks.length,
            color: theme.palette.task.inProgress,
        },
        {
            id: 'Review',
            label: 'Review',
            value: reviewTasks.length,
            color: theme.palette.task.review,
        },
        {
            id: 'Completed',
            label: 'Completed',
            value: completedTasks.length,
            color: theme.palette.task.completed,
        },
        ];


    return(
        <Box m="20px">
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    overflow="auto"
                    display="flex"
                    flexDirection="column"
                    p="1.25rem 1rem"
                    flex="1 1 100%"
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="0.55rem"
                    gap="20px"
                >
                    <ResponsivePie
                        data={data}
                        margin={{ top: 20, right: 40, bottom: 40, }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        colors={{ datum: 'data.color' }}
                        theme={{
                            axis: {
                                legend: {
                                    text: {
                                      fill: theme.palette.text.alt,
                                    },
                                  },
                                ticks: {
                                    line: {
                                        stroke: theme.palette.text.alt,
                                        strokeWidth: 1,
                                    },
                                    text: {
                                        fill: theme.palette.text.alt,
                                    },
                                },
                            },
                        }}
                    />
                </Box>

            </Box>
        </Box>
    
    );

};

export default HomePage;
