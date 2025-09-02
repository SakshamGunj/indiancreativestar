// Cloudinary configuration
// Values are read from Vite environment variables.
// Ensure you set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    console.error('Cloudinary configuration missing. Expected VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
    throw new Error('Image upload not configured. Please contact support.');
  }

  // Obtain a signed payload from our serverless function so we can upload to a signed preset
  const signResponse = await fetch('/api/cloudinary-sign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uploadPreset: CLOUDINARY_CONFIG.uploadPreset })
  });
  if (!signResponse.ok) {
    throw new Error('Failed to obtain upload signature');
  }
  const { cloudName, apiKey, timestamp, signature } = await signResponse.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      // Try to extract Cloudinary error details if available
      try {
        const errorJson = await response.json();
        const message = errorJson?.error?.message || `Cloudinary error ${response.status}`;
        throw new Error(message);
      } catch {
        throw new Error('Failed to upload image to Cloudinary');
      }
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed. Please try again.');
  }
};

// Signed uploads should be implemented server-side. No client secret here.