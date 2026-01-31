import { promises as fs } from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import HomeClient from './components/HomeClient';

export default async function Home() {
  // Read images from the galleryImages folder
  const galleryDir = path.join(process.cwd(), 'public/images/galleryImages');
  const previewDir = path.join(process.cwd(), 'public/images/galleryImagesPreviews');
  let galleryFiles: string[] = [];
  let previewFiles: string[] = [];

  try {
    const files = await fs.readdir(galleryDir);
    // Filter for image files only
    galleryFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );
    // Sort by number prefix (e.g., "1 Sumi.jpg" comes before "2 Ryza.JPG")
    galleryFiles.sort((a, b) => {
      const numA = parseInt(a.match(/^\d+/)?.[0] || '0', 10);
      const numB = parseInt(b.match(/^\d+/)?.[0] || '0', 10);
      return numA - numB;
    });
  } catch (error) {
    console.error('Error reading gallery images:', error);
  }

  // Read preview images if the folder exists
  try {
    const files = await fs.readdir(previewDir);
    previewFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(file)
    );
  } catch (error) {
    // Preview folder might not exist, which is fine
  }

  // Create a map of preview files by name (without extension) for quick lookup
  const previewMap = new Map<string, string>();
  previewFiles.forEach(file => {
    const nameWithoutExt = file.replace(/\.[^/.]+$/, '');
    previewMap.set(nameWithoutExt.toLowerCase(), file);
  });

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

    // Check if there's a preview image for this gallery image
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const previewFilename = previewMap.get(nameWithoutExt.toLowerCase());
    const previewSrc = previewFilename ? `/images/galleryImagesPreviews/${previewFilename}` : `/images/galleryImages/${filename}`;

    // If there's a preview image, use its dimensions for layout
    if (previewFilename) {
      try {
        const previewPath = path.join(previewDir, previewFilename);
        const previewBuffer = await fs.readFile(previewPath);
        const previewDimensions = sizeOf(previewBuffer);
        if (previewDimensions.width && previewDimensions.height) {
          width = previewDimensions.width;
          height = previewDimensions.height;
          isLandscape = previewDimensions.width > previewDimensions.height;
        }
      } catch (error) {
        console.error(`Error getting dimensions for preview ${previewFilename}:`, error);
      }
    }

    return {
      src: `/images/galleryImages/${filename}`,
      previewSrc: previewSrc,
      alt: filename
        .replace(/\.[^/.]+$/, '') // Remove file extension
        .replace(/^\d+\s+/, '') // Remove number prefix (e.g., "1 ")
        .replace(/[-_]/g, ' '), // Replace hyphens/underscores with spaces
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
