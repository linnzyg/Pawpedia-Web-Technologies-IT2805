import { DogBreed, Size } from '../types/DogBreed';
import goldenretrieverImg from '../assets/golden-retriever.jpeg';
import mittelspitzImg from '../assets/mittelspitz.jpeg';
import huskyImg from '../assets/husky.jpeg';
import pomeranianImg from '../assets/pomeranian.jpeg';
import poodleImg from '../assets/poodle.jpeg';
import samoyedImg from '../assets/samoyed.jpeg';

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
    name: 'Husky',
    description: 'Alaskan dog',
    imageUrl: huskyImg,
    slug: generateSlug('husky'),
    favorite: true,
    size: Size.Large,
  },
  {
    id: 4,
    name: 'Poodle',
    description: 'Friendly, intelligent familydog',
    imageUrl: poodleImg,
    slug: generateSlug('poodle'),
    favorite: false,
    size: Size.Medium,
  },

  {
    id: 5,
    name: 'Samoyed',
    description: 'Friendly, intelligent familydog',
    imageUrl: samoyedImg,
    slug: generateSlug('samoyed'),
    favorite: false,
    size: Size.Large,
  },

  {
    id: 6,
    name: 'Pomeranian',
    description: 'Friendly, intelligent familydog',
    imageUrl: pomeranianImg,
    slug: generateSlug('pomeranian'),
    favorite: false,
    size: Size.Small,
  },


];
