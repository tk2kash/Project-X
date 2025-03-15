import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Calendar = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const [tasks, setTasks] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  
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

  const events = tasks.map((task) => {
    return {
      id: task._id,
      title: task.title,
      start: task.startDate,
      end: task.dueDate,
      eventColor: palette.task.main,
    };
  }).sort((a, b) => new Date(a.start) - new Date(b.start));


  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your task");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={palette.background.default}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Tasks</Typography>
          <List>
            {events.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: palette.task.main,
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={events}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;