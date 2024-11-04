import { DogBreed, Size } from '../types/DogBreed';

const goldenretrieverImg = '/images/golden-retriever.jpeg';
const mittelspitzImg = '/images/mittelspitz.jpeg';
const huskyImg = '/images/husky.jpeg';
const pomeranianImg = '/images/pomeranian.jpeg';
const poodleImg = '/images/poodle.jpeg';
const samoyedImg = '/images/samoyed.jpeg';


/**
 * Utility function to generate slugs from breed names
 * - Converts name to lowercase and replaces spaces with dashes
 */

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}


/**
 * Mock data representing different dog breeds
 * - Used for testing and initial setup purposes
 * - Contains hardcoded breed data such as id, name, description, image, etc.
 */

  export const mockDogBreeds: DogBreed[] = [
    {
      id: '6706af95370cf43e0a195b50', // ids are now matching MongoDB ids
      name: 'Mittelspitz',
      description: 'Small, funny, happy dog',
      image: mittelspitzImg,
      slug: generateSlug('mittelspitz'),
      favorite: false,
      size: Size.Small,
    },
    {
      id: '6706af95370cf43e0a195b51', 
      name: 'Golden Retriever',
      description: 'Friendly, intelligent familydog',
      image: goldenretrieverImg,
      slug: generateSlug('golden-retriever'),
      favorite: true,
      size: Size.Large,
    },
    {
      id: '6706af95370cf43e0a195b52', 
      name: 'Husky',
      description: 'Alaskan dog',
      image: huskyImg,
      slug: generateSlug('husky'),
      favorite: true,
      size: Size.Large,
    },
    {
      id: '6706af95370cf43e0a195b53', 
      name: 'Poodle',
      description: 'Friendly, intelligent familydog',
      image: poodleImg,
      slug: generateSlug('poodle'),
      favorite: false,
      size: Size.Medium,
    },
    {
      id: '6706af95370cf43e0a195b54', 
      name: 'Samoyed',
      description: 'Friendly, intelligent familydog',
      image: samoyedImg,
      slug: generateSlug('samoyed'),
      favorite: false,
      size: Size.Large,
    },
    {
      id: '6706af95370cf43e0a195b55', 
      name: 'Pomeranian',
      description: 'Friendly, intelligent familydog',
      image: pomeranianImg,
      slug: generateSlug('pomeranian'),
      favorite: false,
      size: Size.Small,
    },
  ];
  
