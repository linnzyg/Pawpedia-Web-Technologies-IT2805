import { DogBreed } from "../types/DogBreed";
import goldenretrieverImg from '../assets/golden-retriever.jpeg'
import mittelspitzImg from '../assets/mittelspitz.jpeg'

export const mockDogBreeds: DogBreed[] = [
    {
        id: 1,
        name: 'Golden Retriever',
        description: 'Friendly, intelligent familydog',
        imageUrl: goldenretrieverImg

    },
    {
        id: 2,
        name: 'Mittelspitz',
        description: 'Small, funny, happy dog',
        imageUrl: mittelspitzImg
    }
]