
import { Routes, Route } from 'react-router-dom';
import DogBreedGallery from './components/DogBreedGallery/DogBreedGallery';
import DogBreedDetailWrapper from './components/DogBreedDetail/DogBreedDetailWrapper';
import Navbar from './components/Global/Navbar/Navbar.tsx';
import { FavoritesGrid } from './components/FavoritesGrid/FavoritesGrid.tsx';
import { ThemeProvider } from '@mui/material/styles';
import { styletheme } from './style/themes.ts';
import { CssBaseline } from '@mui/material';
import AboutUs from './components/AboutUs/AboutUs.tsx';

function App() {
  return (
    <ThemeProvider theme={styletheme}>
      <CssBaseline>
        <Navbar />
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={<DogBreedGallery />} />
          <Route path="/:id" element={<DogBreedDetailWrapper />} />
          <Route path="/favorites" element={<FavoritesGrid />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
