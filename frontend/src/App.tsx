
import React from 'react';
import DogBreedDetail from './components/DogBreedDetail';
import { mockDogBreeds } from './data/mockDogBreeds';

function App() {
  
  const testBreed = mockDogBreeds[0];
  const testBreedTwo = mockDogBreeds[1]

  return (
    <div className="App">
      <DogBreedDetail breed={testBreed} />
      <DogBreedDetail breed={testBreedTwo} />
    </div>
  );
}

export default App;
