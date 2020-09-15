import React from 'react';

import './App.css';
import Editor from './components/Editor';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Title from './components/Title';

function App() {
  return (
    <div id='container'>
      <Title />
      <Navbar />
      <Sidebar />
      <Editor />
    </div>
  );
}

export default App;
