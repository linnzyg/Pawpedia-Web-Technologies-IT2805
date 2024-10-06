export interface DogBreed {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  favorite?: boolean;
  size: Size;
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
