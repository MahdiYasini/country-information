import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Blog from './components/blog/Blog';
function App() {
  return (
    <BrowserRouter>
          <Blog/>
    </BrowserRouter>
  );
}

export default App;
