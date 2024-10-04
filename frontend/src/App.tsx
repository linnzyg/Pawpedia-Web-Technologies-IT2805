// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import DogBreedGallery from './components/DogBreedGallery';
import DogBreedDetailWrapper from './components/DogBreedDetailWrapper';
import Home from './components/Home.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<DogBreedGallery />} />
        <Route path="/:slug" element={<DogBreedDetailWrapper />} />
      </Routes>
    </>
    
  );
}

export default App;
