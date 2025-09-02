# Cloudinary Setup Guide for Sikkim Creative Star

## Overview
This guide will help you set up Cloudinary for image uploads in the Sikkim Creative Star registration system.

## Prerequisites
- A Cloudinary account (free tier available)
- Your Cloudinary cloud name, API key, and API secret

## Step 1: Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Note down your cloud name from the dashboard

## Step 2: Get Your API Credentials
1. In your Cloudinary dashboard, go to Settings > Access Keys
2. Copy your API Key and API Secret
3. Note your Cloud Name

## Step 3: Create an Upload Preset
1. In your Cloudinary dashboard, go to Settings > Upload
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Set the following:
   - **Preset name**: `sikkim_creative_star`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `sikkim-creative-star` (optional)
5. Save the preset

## Step 4: Configure Environment Variables
Create a `.env` file based on `.env.example`:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=sikkim_creative_star
```

The app now reads these values in `src/lib/cloudinary.ts`. Do not put API secrets in the client.

## Step 5: Test the Setup
1. Start the development server: `npm run dev`
2. Navigate to `/sikkimcreativestar`
3. Try uploading an image during registration
4. Check your Cloudinary dashboard to see if the image was uploaded

## Security Notes
- Never expose your API secret in client-side code
- For production, prefer signed uploads with a server-side signature endpoint
- Current implementation uses unsigned uploads with a preset

## Troubleshooting
- **401 Unauthorized**: Ensure `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET` are set and the preset is Unsigned
- **CORS errors**: Ensure your Cloudinary account allows uploads from your domain
- **File size errors**: The system limits uploads to 10MB

## Production Considerations
For production deployment:
1. Use environment variables for API credentials
2. Implement server-side signature generation for secure uploads
3. Set up proper CORS policies
4. Consider using Cloudinary's transformation features for image optimization