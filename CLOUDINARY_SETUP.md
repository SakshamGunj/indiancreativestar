# Cloudinary Setup Guide for Sikkim Creative Star

## Overview
This guide will help you set up Cloudinary for image uploads in the Sikkim Creative Star application.

## Prerequisites
- Cloudinary account (free tier available)
- API credentials from your Cloudinary dashboard

## Step 1: Get Your Cloud Name
1. Log in to your Cloudinary dashboard
2. Your cloud name is displayed in the top-left corner of the dashboard
3. It looks like: `your-cloud-name` or `demo`

## Step 2: Create Upload Preset
1. In your Cloudinary dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `sikkim_creative_star`
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `sikkim-creative-star/profiles` (optional)
   - **Allowed formats**: `jpg, png, jpeg`
   - **Max file size**: `10MB`
   - **Transformation**: You can add transformations like resize, crop, etc.
5. Click **Save**

## Step 3: Update Configuration
Update the `src/lib/cloudinary.ts` file with your actual cloud name:

```typescript
export const CLOUDINARY_CONFIG = {
  cloudName: 'your-actual-cloud-name', // Replace with your cloud name
  apiKey: '775374399753362',
  apiSecret: 'jwe-J4gocdB4VMayA5Cq9x7cGFM',
  uploadPreset: 'sikkim_creative_star'
};
```

## Step 4: Test Upload
1. Start your development server
2. Navigate to `/sikkimcreativestar`
3. Try uploading an image
4. Check your Cloudinary Media Library to confirm the upload

## Security Notes
- The API secret is not used in client-side code for security
- Upload presets with unsigned mode are safe for client-side use
- Consider setting up folder organization in your Cloudinary account
- Monitor your usage to stay within free tier limits

## Troubleshooting
- **Upload fails**: Check that the cloud name and upload preset are correct
- **File too large**: Ensure the file is under 10MB
- **Invalid format**: Make sure the file is jpg, png, or jpeg
- **CORS errors**: This should not occur with unsigned uploads

## Additional Configuration (Optional)
You can add image transformations in the upload preset:
- **Resize**: Set maximum width/height
- **Quality**: Optimize for web
- **Format**: Convert to webp for better compression
- **Gravity**: Set crop behavior

## Support
If you encounter issues, check:
1. Cloudinary documentation: https://cloudinary.com/documentation
2. Upload API reference: https://cloudinary.com/documentation/upload_images
3. Contact support at daamievent@gmail.com