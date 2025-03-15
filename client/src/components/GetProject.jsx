import { Box ,Typography, useMediaQuery, useTheme} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectBox from "./ProjectBox";

const GetProject = ({ userId}) => {
  const token = useSelector((state) => state.token);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [project, setProjects] = useState([]);
  const theme = useTheme();
  const fetchProjects = async () => {
    const response = await fetch(
      `http://localhost:3001/projects/${userId}/projects`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setProjects(data);
  };
  useEffect(() => {
    fetchProjects();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="160px"       
          gap="20px"
          overflow="auto"
          gridColumn="span 12"
          gridRow="span 10"
          sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          }}
          >
            {project.map(
              ({
                _id,
                name,
                description,
              }) => (
                <ProjectBox
                  key={_id}
                  projectId={_id}
                  name={name}
                  description={description}
                />
              )
            )}

          </Box>
        </Box>     
    </>
  );
};

export default GetProject;