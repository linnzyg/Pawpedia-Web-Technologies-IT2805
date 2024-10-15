export interface DogBreed {
  id: string;
  name: string;
  description?: string;
  image: Image;
  favorite?: boolean;
  comments?: {
    username: string;
    comment: string;
    timestamp: string;
  }[];
  size: Size;
}

interface Image {
  filename: string;
  contentType: string;
  GridFSId: string;
}

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
