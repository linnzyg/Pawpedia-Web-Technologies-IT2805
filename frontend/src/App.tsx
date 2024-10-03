// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DogBreedGallery from './components/DogBreedGallery';
import DogBreedDetailWrapper from './components/DogBreedDetailWrapper';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DogBreedGallery />} />
      <Route path="/:slug" element={<DogBreedDetailWrapper />} />
    </Routes>
  );
}

export default App;
