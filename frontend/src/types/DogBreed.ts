
export interface DogBreed {
  id: string; // Unique identifier for the breed, matches the MongoDB ObjectId
  name: string; // The name of the dog breed
  description?: string; // Optional description providing details about the breed
  image: string; // Filename or path to the breed's image
  slug: string; // URL-friendly version of the breed name for routing
  favorite?: boolean; // Optional boolean indicating if the breed is a user's favorite
  comments?: {
    username: string; // Name of the user who left the comment
    comment: string; // The comment content
    timestamp: string; // Time when the comment was made
  }[]; // Optional array of comments left by users on this breed
  size: Size; // Enum value representing the breed's size (Small, Medium, Large)
  weight: number;
  height: number;
  lifespan: number;
  trainability: number;
  friendliness: number;
  allergy: number;
  energy: number;
  issues: string;
}

// Enum representing the possible sizes for dog breeds
export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}