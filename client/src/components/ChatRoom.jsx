import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, TextField, Button, Typography ,useTheme} from '@mui/material';
import { useSelector } from "react-redux";

const ChatRoom = ({ socket, projectId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const fetchMessages = async () => {
    const response = await fetch(
        `http://localhost:3001/message/projects/${projectId}/messages`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    socket.emit('join', projectId);

    fetchMessages();

    
    socket.on('message', (message) => {
        fetchMessages();
    });


    return () => {
      socket.emit('leave', projectId);
    };
  }, [projectId, socket]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
        socket.emit('message', { text: message.trim(), project: projectId , user: _id});
        setMessage('');
    }
  };


  return (

    <Box
        display="flex"
        overflow="auto"
        flex="1 1 100%"
        flexDirection="column"
    >
        <Box 
            gridColumn="span 2"
            gridRow="span 1"
            //display="flex"
            //flexDirection="column"
            justifyContent="space-between"
            p="1.25rem 1rem"
            flex="1 1 100%"
            backgroundColor={theme.palette.neutral.light}
            overflow="scroll"
            position= "relative"
            padding= "1rem 2rem">
                    {messages.map((msg, index) => (
                        <Typography key={index}>
                            {msg.user.userName}: {msg.text}
                        </Typography>
               
                        ))}
                
        </Box>
        
        <Box sx={{
                    mt: "20px",
                    display: 'flex',
                    flexDirection: 'row', 
                    alignItems: 'center' }}>
            <TextField
            label="Type your message here"
            variant="outlined"
            value={message}
            onChange={handleMessageChange}
            sx={{ flexGrow: 1 }}
            />
            <Button onClick={handleSendMessage} sx={{ marginLeft: 2 }}>
            Send
            </Button>
        </Box>
    </Box>
  );
};

export default ChatRoom;
