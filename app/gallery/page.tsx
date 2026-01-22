import { promises as fs } from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  // Read images from the galleryImages folder
  const galleryDir = path.join(process.cwd(), 'public/images/galleryImages');
  let imageFiles: string[] = [];

  try {
    const files = await fs.readdir(galleryDir);
    // Filter for image files only
    imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );
  } catch (error) {
    console.error('Error reading gallery images:', error);
  }

  // Convert to image objects with actual dimensions
  const images = await Promise.all(imageFiles.map(async filename => {
    const filePath = path.join(galleryDir, filename);
    let width = 800;
    let height = 1000;
    let isLandscape = false;

    try {
      const buffer = await fs.readFile(filePath);
      const dimensions = sizeOf(buffer);
      if (dimensions.width && dimensions.height) {
        width = dimensions.width;
        height = dimensions.height;
        isLandscape = dimensions.width > dimensions.height;
      }
    } catch (error) {
      console.error(`Error getting dimensions for ${filename}:`, error);
    }

    return {
      src: `/images/galleryImages/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      width,
      height,
      isLandscape
    };
  }));

  return <GalleryClient images={images} />;
}
