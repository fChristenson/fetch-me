export interface ICrop {
  aspect: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * @param {File} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
export function getCroppedImg(image: any, crop: ICrop) {
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
