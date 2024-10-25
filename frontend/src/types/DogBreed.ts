export interface DogBreed {
  id: string;
  name: string;
  description?: string;
  image: string;
  favorite?: boolean;
  comments?: {
    username: string;
    comment: string;
    timestamp: string;
  }[];
  size: Size;
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
