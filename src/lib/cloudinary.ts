// Cloudinary configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'your_cloud_name', // Replace with your actual cloud name
  apiKey: '775374399753362',
  apiSecret: 'jwe-J4gocdB4VMayA5Cq9x7cGFM',
  uploadPreset: 'sikkim_creative_star' // You'll need to create this preset in your Cloudinary dashboard
};

// Function to upload image to Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed. Please try again.');
  }
};

// Function to generate signature for secure uploads (if needed)
export const generateSignature = (params: any): string => {
  // This would be implemented on the server side for security
  // For now, we'll use unsigned uploads with upload preset
  return '';
};