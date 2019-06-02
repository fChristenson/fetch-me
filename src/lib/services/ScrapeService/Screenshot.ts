export interface IScreenshot {
  image: string;
}

export function Screenshot(image: string) {
  return {image};
}
