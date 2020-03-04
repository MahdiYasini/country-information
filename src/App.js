import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Blog from './components/blog/Blog';
function App() {
  return (
    <BrowserRouter>
      <Container>
        <div className="App">
          <Blog />
        </div>
      </Container>
    </BrowserRouter>
  );
}

export default App;
