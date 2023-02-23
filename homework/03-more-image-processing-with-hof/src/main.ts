import { Image } from "../include/image.js";
import { combineThree, imageBlur } from "./moreImageProcessing.js";

imageBlur(Image.loadImageFromGallery()).show();
combineThree(Image.loadImageFromGallery()).show();
