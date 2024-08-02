import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, List, Typography } from '@mui/material';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [keySequence, setKeySequence] = useState([]);

  useEffect(() => {
    const initialMessage = { sender: 'bot', text: 'Merhaba🖐️ Ben Çorumgaz müşteri temsilcisi, size nasıl yardımcı olabilirim?' };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeySequence((prevSequence) => {
        const newSequence = [...prevSequence, e.key].slice(-6);
        if (newSequence.join('').includes('author')) {
          setShowEasterEgg(true);
          setTimeout(() => {
            setShowEasterEgg(false);
          }, 2000);
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const query = async (data) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/query', { question: data });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      return { text: 'Error: Unable to get response from server' };
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');
      setLoading(true);

      // API call
      const response = await query(input);
      const botMessage = { sender: 'bot', text: response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '97vh',
        width: '100%',
        bgcolor: 'background.default',
        p: 0,
        m: 0,
      }}
    >
      <List
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && <ChatMessage message={{ sender: 'bot', text: '...' }} />}
      </List>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          borderTop: '1px solid #ccc',
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            sx={{
              mr: 1,
              bgcolor: '#fff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                },
              },
              '& input': {
                color: 'black',
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Gönder
          </Button>
        </Box>
        {showEasterEgg && (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
            Made by ceyhunemre0
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
