import {Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const AddTaskPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return <Box>
        <Box
            width={isNonMobileScreens? "45%" : "90%"}
            p="2rem"
            m="4rem auto"
            borderRadius=" 1.5rem"
            backgroundColor= {theme.palette.background.alt}
        >
            <Typography fontWeight={500} variant="h5" sx={{mb: "1.5rem"}}>
                Create your Task
            </Typography>
            <Form>

            </Form>
        </Box>
    </Box>;

};

export default AddTaskPage;