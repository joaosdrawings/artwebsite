import { promises as fs } from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import HomeClient from './components/HomeClient';

export default async function Home() {
  // Read images from the galleryImages folder
  const galleryDir = path.join(process.cwd(), 'public/images/galleryImages');
  let galleryFiles: string[] = [];

  try {
    const files = await fs.readdir(galleryDir);
    // Filter for image files only
    galleryFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );
  } catch (error) {
    console.error('Error reading gallery images:', error);
  }

  // Convert to image objects with actual dimensions
  const galleryImages = await Promise.all(galleryFiles.map(async filename => {
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

  // Read images from the conventionTables folder
  const conventionDir = path.join(process.cwd(), 'public/images/conventionTables');
  let conventionFiles: string[] = [];

  try {
    const files = await fs.readdir(conventionDir);
    // Filter for image files only
    conventionFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );
  } catch (error) {
    console.error('Error reading convention table images:', error);
  }

  // Convert to image objects with actual dimensions
  const conventionTableImages = await Promise.all(conventionFiles.map(async filename => {
    const filePath = path.join(conventionDir, filename);
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
      src: `/images/conventionTables/${filename}`,
      alt: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      width,
      height,
      isLandscape
    };
  }));

  return <HomeClient galleryImages={galleryImages} conventionTableImages={conventionTableImages} />;
}
