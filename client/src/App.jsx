import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Chat from './Components/Chat';
import { ThemeProvider } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ bgcolor: '#202123', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Routes>
              <Route path="/" element={<Chat />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
