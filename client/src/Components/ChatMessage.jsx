import React from 'react';
import { ListItem, Box } from '@mui/material';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const isLoading = message.text === '...';
  const emoji = isUser ? '👤' : '🤖';

  return (
    <ListItem
      sx={{
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      {!isUser && (
        <Box sx={{ mr: 1, mt: 'auto', mb: 'auto' }}>{emoji}</Box>
      )}
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'white' : 'black',
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
          m: 1,
        }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: 'inline-block',
              '& span': {
                display: 'inline-block',
                fontSize: '1.5rem',
                animation: 'loading 1.4s infinite',
              },
              '& span:nth-of-type(1)': {
                animationDelay: '0s',
              },
              '& span:nth-of-type(2)': {
                animationDelay: '0.2s',
              },
              '& span:nth-of-type(3)': {
                animationDelay: '0.4s',
              },
              '@keyframes loading': {
                '0%': {
                  opacity: 0,
                },
                '20%': {
                  opacity: 1,
                },
                '100%': {
                  opacity: 0,
                },
              },
            }}
          >
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </Box>
        ) : (
          message.text
        )}
      </Box>
      {isUser && (
        <Box sx={{ ml: 1, mt: 'auto', mb: 'auto' }}>{emoji}</Box>
      )}
    </ListItem>
  );
};

export default ChatMessage;
