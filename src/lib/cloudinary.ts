// Cloudinary configuration (hardcoded per user request)
export const CLOUDINARY_CONFIG = {
  cloudName: 'dhvzfbhbe',
  uploadPreset: 'profilephoto',
  apiKey: '775374399753362',
  apiSecret: 'jwe-J4gocdB4VMayA5Cq9x7cGFM'
};

// Function to upload image to Cloudinary
// Compute SHA-1 hex in the browser
async function computeSha1Hex(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    throw new Error('Image upload not configured.');
  }

  // Build signed params entirely on client (per request)
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signParams = new URLSearchParams();
  signParams.set('timestamp', timestamp);
  signParams.set('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  const toSign = `${Array.from(signParams.keys()).sort().map(k => `${k}=${signParams.get(k)}`).join('&')}${CLOUDINARY_CONFIG.apiSecret}`;
  const signature = await computeSha1Hex(toSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
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