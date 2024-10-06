import { DogBreed, Size } from '../types/DogBreed';
import goldenretrieverImg from '../assets/golden-retriever.jpeg';
import mittelspitzImg from '../assets/mittelspitz.jpeg';

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export const mockDogBreeds: DogBreed[] = [
  {
    id: 2,
    name: 'Mittelspitz',
    description: 'Small, funny, happy dog',
    imageUrl: mittelspitzImg,
    slug: generateSlug('mittelspitz'),
    favorite: false,
    size: Size.Small,
  },
  {
    id: 1,
    name: 'Golden Retriever',
    description: 'Friendly, intelligent familydog',
    imageUrl: goldenretrieverImg,
    slug: generateSlug('golden-retriever'),
    favorite: true,
    size: Size.Large,
  },
  {
    id: 3,
    name: 'A test dog',
    description: 'Friendly, intelligent familydog',
    imageUrl: goldenretrieverImg,
    slug: generateSlug('golden-retriever'),
    favorite: true,
    size: Size.Large,
  },
  {
    id: 4,
    name: 'Z test dog',
    description: 'Friendly, intelligent familydog',
    imageUrl: goldenretrieverImg,
    slug: generateSlug('golden-retriever'),
    favorite: false,
    size: Size.Small,
  },
];
