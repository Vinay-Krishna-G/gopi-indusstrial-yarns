import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import path from 'path';

// Load variables from .env
config();

const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret || cloudName === 'YOUR_CLOUDINARY_CLOUD_NAME') {
  console.error("❌ Missing or invalid Cloudinary credentials in .env");
  console.error("Make sure VITE_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const images = [
  // Standard imagery
  { localPath: 'public/images/yarns/orange.png', publicId: 'yarns/orange' },
  { localPath: 'public/images/yarns/spectrum.png', publicId: 'yarns/spectrum' },
  { localPath: 'public/images/yarns/full-collection.png', publicId: 'yarns/full-collection' },
  { localPath: 'public/images/yarns/flow-arrangement.png', publicId: 'yarns/flow-arrangement' },
  { localPath: 'public/images/yarns/green.png', publicId: 'yarns/green' },
  { localPath: 'public/images/yarns/macro.png', publicId: 'yarns/macro' },
  
  // Transparent imagery (Colour Experience)
  { localPath: 'public/images/yarns/transparent/green.png', publicId: 'yarns/transparent/green' },
  { localPath: 'public/images/yarns/transparent/blue.png', publicId: 'yarns/transparent/blue' },
  { localPath: 'public/images/yarns/transparent/white.png', publicId: 'yarns/transparent/white' },
  { localPath: 'public/images/yarns/transparent/red.png', publicId: 'yarns/transparent/red' },
  { localPath: 'public/images/yarns/transparent/orange.png', publicId: 'yarns/transparent/orange' },
  { localPath: 'public/images/yarns/transparent/yellow.png', publicId: 'yarns/transparent/yellow' },
  { localPath: 'public/images/yarns/transparent/black-yellow.png', publicId: 'yarns/transparent/black-yellow' },
  { localPath: 'public/images/yarns/transparent/red-yellow.png', publicId: 'yarns/transparent/red-yellow' },
];

async function uploadImages() {
  console.log(`Starting programmatic upload to Cloudinary (Cloud: ${cloudName})...\n`);
  
  for (const img of images) {
    try {
      const fullPath = path.resolve(process.cwd(), img.localPath);
      // We pass unique_filename: false and use_filename: false because we want 
      // the public_id to be EXACTLY the mapped one (e.g. 'yarns/orange')
      await cloudinary.uploader.upload(fullPath, {
        public_id: img.publicId,
        overwrite: true,
      });
      console.log(`✅ Uploaded: ${img.publicId}`);
    } catch (err) {
      console.error(`❌ Failed: ${img.publicId}`);
      console.error(err);
    }
  }
  
  console.log('\nUpload complete! You can safely delete CLOUDINARY_API_SECRET from your .env if desired.');
}

uploadImages();
