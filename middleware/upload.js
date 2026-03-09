

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devlinks_profiles',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  },
});

// 2. Storage for PDF Resumes
const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devlinks_resumes',
    allowed_formats: ['pdf'], 
    resource_type: 'auto', // Vital for non-image files
  },
});

export const uploadImage = multer({ storage: imageStorage });
export const uploadDoc = multer({ storage: docStorage });