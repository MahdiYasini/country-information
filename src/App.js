import React from 'react';
import './App.css';
import Blog from './components/blog/Blog';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Blog/>
      </div>
    </BrowserRouter>
  );
}

export default App;
