import {v2 as cloudinary} from 'cloudinary';
export function configureCloudinary(env=process.env){const {CLOUDINARY_CLOUD_NAME:cloud_name,CLOUDINARY_API_KEY:api_key,CLOUDINARY_API_SECRET:api_secret}=env;if(!cloud_name||!api_key||!api_secret)throw Error('Cần CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY và CLOUDINARY_API_SECRET trong be/.env.');cloudinary.config({cloud_name,api_key,api_secret,secure:true});return cloudinary;}
export function resourceType(file){return /\.(wav|mp3|ogg|m4a)$/i.test(file)?'video':'image';}
