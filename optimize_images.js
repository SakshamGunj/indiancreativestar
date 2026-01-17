import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'public', 'optimized_gallery');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Extracted from WinterArtRoyale.tsx
const imageUrls = [
    "https://i.ibb.co/60WQ1Q4Q/artwork-1762353412751.jpg",
    "https://i.ibb.co/g0M4rZX/artwork-1762229280616.jpg",
    "https://i.ibb.co/rKTRyNk3/artwork-1761851051490.jpg",
    "https://i.ibb.co/MmV16NK/artwork-1761754760236.jpg",
    "https://i.ibb.co/8nZvQ1CX/artwork-Hn-Cjlnnn-Fo-OLc8l-Ug-Im0-WBi-Hs-AC3-1761747781067.jpg",
    "https://i.ibb.co/d44XrDDm/artwork-1761725665374.jpg",
    "https://i.ibb.co/8LkC7NJZ/artwork-KCDc-Oju-Cqqbg8f-CEw-Fwk-U4x5c-Ff2-1761745137536.jpg",
    "https://i.ibb.co/934S9czw/artwork-1761707855856.jpg",
    "https://i.ibb.co/pBLxzWzz/artwork-1761662549363.jpg",
    "https://i.ibb.co/Pv39ydhP/artwork-1761324889394.jpg",
    "https://i.ibb.co/V0vsyWwr/artwork-1760958935863.jpg",
    "https://i.ibb.co/7JScRm2W/artwork-1760958935902.jpg",
    "https://i.ibb.co/xKJMVT8W/artwork-v5-XLj-M1-Qz7-WIWd-E6ht-DKMoh3-Elv1-1760814935176.jpg",
    "https://i.ibb.co/nqFnpHJj/artwork-1760796807708.jpg",
    "https://i.ibb.co/JRMnL8R6/artwork-NKKekfy-PXxd5-Vdit-Hwp-CROh-HTFy2-1760786741753.jpg",
    "https://i.ibb.co/KjyMbj50/artwork-1760775217011.jpg",
    "https://i.ibb.co/0yhM5Wn4/artwork-x-Kc-Gcy-Cux-Xf-XGmu-Tp-Nsh6-HSt-Orn1-1760758580157.jpg",
    "https://i.ibb.co/cSCf6Byp/artwork-3epwp-U6-Ngjaynf2-UJZyzu-N0-C0-Fz2-1760723698714.jpg",
    "https://i.ibb.co/FqXgss3R/artwork-yt-Kp-PKo-Gnngf-X0-Zex-XOPcc-FGg-Im2-1760687675388.jpg",
    "https://i.ibb.co/nqqTCVG1/artwork-L2-Eav5w2a-VM30-Jnfz4yl-QS6k3-KB3-1760513955767.jpg",
    "https://i.ibb.co/LDT0Jn0z/artwork-by-TLGOHgk-Ghl-Dqdkrwg1k-EANgt43-1760509536643.jpg",
    "https://i.ibb.co/bjXyJ73W/artwork-b-UWFv-Elsof-M1w-IU1-TQV1bsdhkw03-1759994580222.jpg",
    "https://i.ibb.co/wZq3rfZ3/artwork-U0bem5y-EGRZPs-K0-YRW5f7lt-Ue1a2-1759976624499.jpg",
    "https://i.ibb.co/jccLbpV/artwork-vha-U4-TMSvxgm-Ums3-I0j0-CCN0-J223-1759937295648.jpg",
    "https://i.ibb.co/fV7hcSDq/artwork-qoi2-DJWfc-EWw-OIL4-S7c9a3-E7-Mao2-1759937357479.jpg",
    "https://i.ibb.co/Psk6qFjm/artwork-8-TOjxn7d-D6-W797tqaxa-A7oq-Ay3-N2-1759828866548.jpg",
    "https://i.ibb.co/bgjZ0qxp/artwork-S2crxv-HOlr-Xg4-BMf5-S8now7fnz62-1759737202019.jpg",
    "https://i.ibb.co/fzFF974y/artwork-mqr-ZGwpw9c-YNVTEd-Qba-Ja-KHRHx-N2-1759483186472.jpg",
    "https://i.ibb.co/BJNJf09/artwork-MLWMW6-P4-Zn-PUKBhk2-Ce-Ep0w-E6xk2-1758700995997.jpg",
    "https://i.ibb.co/WppFgXMy/artwork-mqr-ZGwpw9c-YNVTEd-Qba-Ja-KHRHx-N2-1758699797690.jpg",
    "https://i.ibb.co/jkCjJQc1/artwork-ixj-TSs76-Lv-UDy-WPm-Tp6y4-P3-Yny-H3-1758586940004.jpg",
    "https://i.ibb.co/fV4PHwB0/artwork-QI3-SW7o-Xu6-RAc6-UQT3-BKfky-Bjis1-1759331147803.jpg",
    "https://i.ibb.co/Z1R90MhX/artwork-Bb-Zqhv-I2-DWOr-Hb03qjg-AVTrx-As93-1759421515111.jpg",
    "https://i.ibb.co/YgS15L4/artwork-wq-Pz-OIcltc-UVa-OZ1-Nv4t5-KEizgu1-1759312098224.jpg",
    "https://i.ibb.co/TxZw5pMn/artwork-Ntqssjw9s-KNqk4-Ubq-K6xluud3zr1-1762852332829.jpg",
    "https://i.ibb.co/b5myKfdK/artwork-1763115458120.jpg",
    "https://i.ibb.co/6cPxTSJx/artwork-1763127764360.jpg",
    "https://i.ibb.co/RkP9jj1X/artwork-1763136068751.jpg",
    "https://i.ibb.co/JWyDDWB9/artwork-1763366242290.jpg"
];

async function downloadAndOptimize() {
    let imageCount = 0;
    const optimizedPaths = [];

    console.log(`Starting download and optimization of ${imageUrls.length} images...`);

    for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const outputFilename = `gallery_${i + 1}.webp`;
        const outputPath = path.join(outputDir, outputFilename);

        try {
            console.log(`[${i + 1}/${imageUrls.length}] Downloading: ${url}`);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await sharp(buffer)
                .resize(400, null, { withoutEnlargement: true }) // Intelligent resize
                .webp({ quality: 80, effort: 5 }) // High effort for best compression
                .toFile(outputPath);

            console.log(`   ✅ Optimized -> ${outputFilename}`);
            optimizedPaths.push(`/optimized_gallery/${outputFilename}`);
            imageCount++;
        } catch (err) {
            console.error(`   ❌ Error processing ${url}:`, err.message);
        }
    }

    console.log(`\n🎉 Complete! ${imageCount} images saved to public/optimized_gallery`);
    console.log('JSON Mapping for replacement:');
    console.log(JSON.stringify(optimizedPaths, null, 2));
}

downloadAndOptimize();
