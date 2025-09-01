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

## Step 4: Update Configuration
Update the Cloudinary configuration in `src/lib/cloudinary.ts`:

```typescript
export const CLOUDINARY_CONFIG = {
  cloudName: 'your_actual_cloud_name', // Replace with your cloud name
  apiKey: '775374399753362', // Your API key
  apiSecret: 'jwe-J4gocdB4VMayA5Cq9x7cGFM', // Your API secret
  uploadPreset: 'sikkim_creative_star' // The preset you created
};
```

## Step 5: Test the Setup
1. Start the development server: `npm run dev`
2. Navigate to `/sikkimcreativestar`
3. Try uploading an image during registration
4. Check your Cloudinary dashboard to see if the image was uploaded

## Security Notes
- The API secret should never be exposed in client-side code in production
- For production, consider using signed uploads with server-side signature generation
- The current implementation uses unsigned uploads with a preset for simplicity

## Troubleshooting
- **Upload fails**: Check that your cloud name and upload preset are correct
- **CORS errors**: Ensure your Cloudinary account allows uploads from your domain
- **File size errors**: The system limits uploads to 10MB

## Production Considerations
For production deployment:
1. Use environment variables for API credentials
2. Implement server-side signature generation for secure uploads
3. Set up proper CORS policies
4. Consider using Cloudinary's transformation features for image optimization