export interface DogBreed {
  id: string;
  name: string;
  description?: string;
  image: string;
  slug: string;
  favorite?: boolean;
  comments?: {
    username: string;
    comment: string;
    timestamp: string;
  }[];
  size: Size;
  averageRating?: number;
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
