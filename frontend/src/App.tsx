import { Routes, Route } from 'react-router-dom';
import AllDogsPage from './components/AllDogsPage/AllDogsPage';
import DogBreedDetailWrapper from './components/DogBreedDetail/DogBreedDetailWrapper';
import Navbar from './components/Global/Navbar/Navbar.tsx';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage.tsx';
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
          <Route path="/" element={<AllDogsPage />} />
          <Route path="/:id" element={<DogBreedDetailWrapper />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
