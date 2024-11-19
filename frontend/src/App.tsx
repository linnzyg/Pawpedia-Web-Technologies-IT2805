// src/App.tsx

import { Routes, Route } from 'react-router-dom';
import DogBreedGallery from './components/DogBreedGallery';
import DogBreedDetailWrapper from './components/DogBreedDetailWrapper';
import Home from './components/Home.tsx';
import Navbar from './components/Navbar.tsx';
import { FavoritesGrid } from './components/FavoritesGrid.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { styletheme } from './style/themes.ts';
import { CssBaseline } from '@mui/material';


function App() {
  return (
    <ThemeProvider theme={styletheme}>
      <CssBaseline>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<DogBreedGallery />} />
        <Route path="/:id" element={<DogBreedDetailWrapper />} />
        <Route path="/favorites" element={<FavoritesGrid />} />
      </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}


export default App;
