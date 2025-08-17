import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import VideoStream from './pages/VideoStream';
import VideoUpload from './pages/VideoUpload';
import { Contact } from './pages/Contact';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/stream' element={<VideoStream />} />
        <Route path='/upload' element={<VideoUpload />} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </div>
  );
};

export default App;
