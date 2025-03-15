import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ListAltOutlined,
  CandlestickChartOutlined,
  CalendarMonthOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useSelector } from "react-redux";


const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Project",
      icon: <AssignmentOutlinedIcon />,
    },
    {
      text: "Task",
      icon: <ListAltOutlined />,
    },
    {
      text: "Stats",
      icon: null,
    },
    {
      text: "Overview",
      icon: <AssessmentOutlinedIcon />,
    },
    {
      text: "Calendar",
      icon: <CalendarMonthOutlined />,
    },
    {
      text: "GanttChart",
      icon: <CandlestickChartOutlined />,
    },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
];

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
  }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const fullName = `${user.firstName} ${user.lastName}`;
    const primaryLight = theme.palette.primary.light;


    useEffect(() => {
      setActive(pathname.substring(1));
    }, [pathname]);


    return (
      <Box component="nav">
        {isSidebarOpen && (
          <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.primary[700],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
              },
              transition: "1s",
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                        <Typography
                            fontWeight="bold"
                            fontSize="clamp(1rem, 2rem, 2.25rem)"
                            color="primaryLight"
                            onClick={() => navigate("/dashboard")}
                            sx={{
                            "&:hover": {
                                color: primaryLight,
                                cursor: "pointer",
                            },
                            }}
                        >
                            ProjectX
                        </Typography>
                    </Box>
                    {!isNonMobile && (
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <ChevronLeft />
                        </IconButton>
                    )}
                </FlexBetween>
              </Box>
              <List>
                {navItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
  
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.primary[300]
                              : "transparent",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.primary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.primary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
  
            <Box position="absolute" bottom="2rem" width="100%">
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.primary[100] }}
                  >
                    {fullName}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.primary[300],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box>
          </Drawer>
        )}
      </Box>
    );
  };
  
  export default Sidebar;
