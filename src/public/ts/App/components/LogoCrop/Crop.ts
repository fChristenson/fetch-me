export interface ICrop {
  aspect: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getCroppedImg(image: HTMLImageElement, crop: ICrop) {
  const link = document.createElement("a");
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  // As Base64 string
  const base64Image = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
  link.download = "logo.png";
  link.href = base64Image;
  link.click();
}
