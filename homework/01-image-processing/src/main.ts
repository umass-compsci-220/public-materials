import { COLORS, Image } from "../include/image.js";

const imgWithRedLines = Image.loadImageFromGallery();
for (let x = 0; x < imgWithRedLines.width; ++x) {
  for (let y = 0; y < imgWithRedLines.height; y += 10) {
    imgWithRedLines.setPixel(x, y, COLORS.RED);
  }
}

imgWithRedLines.show();
