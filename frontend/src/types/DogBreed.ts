export interface DogBreed {
  id: string; // Unique identifier for the breed, matches the MongoDB ObjectId
  name: string; // The name of the dog breed
  description?: string; // Optional description providing details about the breed
  image: string; // Filename or path to the breed's image
  slug: string; // URL-friendly version of the breed name for routing
  favorite?: boolean; // Optional boolean indicating if the breed is a user's favorite
  comments?: {
    username: string;
    comment: string;
    timestamp: string;
  }[];
  size: Size;
  averageRating?: number;
}

// Enum representing the possible sizes for dog breeds
export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
