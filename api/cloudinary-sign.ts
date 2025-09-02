import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Helper to build the string to sign per Cloudinary rules
function buildToSign(params: Record<string, string>): string {
  const sortedKeys = Object.keys(params).sort();
  const parts: string[] = [];
  for (const key of sortedKeys) {
    const value = params[key];
    if (value !== undefined && value !== null && value !== '') {
      parts.push(`${key}=${value}`);
    }
  }
  return parts.join('&');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME as string;
  const apiKey = process.env.CLOUDINARY_API_KEY as string;
  const apiSecret = process.env.CLOUDINARY_API_SECRET as string;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary server configuration missing' });
  }

  try {
    const { uploadPreset, folder, publicId } = (req.body || {}) as {
      uploadPreset?: string;
      folder?: string;
      publicId?: string;
    };

    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signParams: Record<string, string> = { timestamp };
    if (uploadPreset) signParams.upload_preset = uploadPreset;
    if (folder) signParams.folder = folder;
    if (publicId) signParams.public_id = publicId;

    const toSign = buildToSign(signParams) + apiSecret;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    return res.status(200).json({
      cloudName,
      apiKey,
      timestamp,
      signature,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate signature' });
  }
}

