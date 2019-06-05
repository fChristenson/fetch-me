export interface IImage {
  imageUrl: string;
}

export function Image(imageUrl: string) {
  return {imageUrl};
}
