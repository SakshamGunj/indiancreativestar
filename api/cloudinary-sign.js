import crypto from 'crypto';

function buildToSign(params) {
	const sortedKeys = Object.keys(params).sort();
	const parts = [];
	for (const key of sortedKeys) {
		const value = params[key];
		if (value !== undefined && value !== null && value !== '') {
			parts.push(`${key}=${value}`);
		}
	}
	return parts.join('&');
}

export default async function handler(req, res) {
	if (req.method === 'GET') {
		return res.status(200).json({ ok: true });
	}
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	// Hardcoded credentials per user request
	const cloudName = 'dhvzfbhbe';
	const apiKey = '775374399753362';
	const apiSecret = 'jwe-J4gocdB4VMayA5Cq9x7cGFM';

	try {
		const fixedUploadPreset = 'profilephoto';
		const timestamp = Math.floor(Date.now() / 1000).toString();

		const signParams = {
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
