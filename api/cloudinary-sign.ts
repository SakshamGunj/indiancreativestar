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

  // Hardcoded credentials per user request
  const cloudName = 'dhvzfbhbe';
  const apiKey = '775374399753362';
  const apiSecret = 'jwe-J4gocdB4VMayA5Cq9x7cGFM';

  try {
    // Use fixed preset and optional folder/public_id if needed in future
    const fixedUploadPreset = 'profilephoto';
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signParams: Record<string, string> = {
      timestamp,
      upload_preset: fixedUploadPreset
    };

    const toSign = buildToSign(signParams) + apiSecret;
    const signature = crypto.createHash('sha1').update(toSign).digest('hex');

    return res.status(200).json({
      cloudName,
      apiKey,
      timestamp,
      signature,
      uploadPreset: fixedUploadPreset
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate signature' });
  }
}

