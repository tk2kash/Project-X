
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProjectPage from 'scenes/projectPage';
import AddProjectPage from 'scenes/addProjectPage';
import SingleProjectPage from 'scenes/singleProjectPage';
import Calendar from 'scenes/calendar/calendar';
import GanttChart from 'scenes/ganttChart';
import AddTaskPage from 'scenes/addTaskPage';
import TaskPage from 'scenes/taskPage';
import {useMemo} from "react";
import {useSelector} from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from 'scenes/layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
          
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
              <Route path = "/" element={<LoginPage/>}/>
              <Route element={<Layout/>}>
                <Route path = "/dashboard" element={isAuth ? <HomePage /> : <Navigate to="/" />}/>
                <Route path = "/project" element={isAuth ? <ProjectPage /> : <Navigate to="/" />}/>
                <Route path = "/task" element={isAuth ? <TaskPage /> : <Navigate to="/" />}/>
                <Route path = "/addproject" element={isAuth ? <AddProjectPage /> : <Navigate to="/" />}/>
                <Route path = "/project/:projectId/:name/addtask" element={isAuth ? <AddTaskPage /> : <Navigate to="/" />}/>
                <Route path = "/calendar" element={isAuth ? <Calendar /> : <Navigate to="/" />}/>
                <Route path = "/ganttchart" element={isAuth ? <GanttChart /> : <Navigate to="/" />}/>
                <Route path = "/project/:projectId/:name" element={isAuth ? <SingleProjectPage /> : <Navigate to="/" />}/>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
