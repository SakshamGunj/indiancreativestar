import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'public', 'optimized_assets');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Map of local filename -> remote URL
const assets = {
    // Brand & Logo
    "war_logo_v2.webp": "https://i.ibb.co/Ldq3TDDB/Winter-Art-Royale-W-A-R-Logo.jpg",
    "daami_logo.webp": "https://simgbb.com/avatar/FqL3vsz54HvL.jpg",
    "founder_photo.webp": "https://www.daamievent.com/WhatsApp%20Image%202025-09-09%20at%2011.03.00.jpeg",

    // Avatars
    "avatar_v2_1.webp": "https://i.ibb.co/0p96CVsn/IMG-239111.jpg",
    "avatar_v2_2.webp": "https://i.ibb.co/pvyvcj7T/Whats-App-Image2025-11-18at4-29-02-PM.jpg",
    "avatar_v2_3.webp": "https://i.ibb.co/tMgcSf4W/Whats-App-Image2025-12-03at3-09-33-PM.jpg",
    "avatar_v2_4.webp": "https://i.ibb.co/GvZFfdkc/Whats-App-Image2025-11-29at3-57-35-PM.jpg",
    "avatar_v2_5.webp": "https://i.ibb.co/HTDFrHHW/Whats-App-Image2025-11-26at6-56-04-PM.jpg",
    "avatar_v2_6.webp": "https://i.ibb.co/5xcftjt1/Whats-App-Image2025-11-29at3-10-34-PM.jpg",

    // Prize Ceremony
    "prize_ceremony_main.webp": "https://i.ibb.co/GvxDtkMB/IMG-20250914-WA0061-1-11zon.jpg",
    "prize_ceremony_1.webp": "https://i.ibb.co/gFjJ0nrD/IMG-20250915-133301-11zon.jpg",
    "prize_ceremony_2.webp": "https://i.ibb.co/PRq5Y0T/IMG-20250914-WA0028-11zon.jpg",
    "prize_ceremony_3.webp": "https://i.ibb.co/dsLXSzc5/IMG-20250914-WA0034-11zon.jpg",
    "prize_ceremony_4.webp": "https://i.ibb.co/hFtJFDNM/IMG-20250914-WA0024-11zon.jpg",
    "prize_ceremony_5.webp": "https://i.ibb.co/RxbjbPt/IMG-20250914-WA0026-11zon-2.jpg",
    "prize_ceremony_6.webp": "https://i.ibb.co/6Jf9VgW9/IMG-20250914-WA0065-11zon.jpg",

    // Certificates & ID
    "cert_excellence.webp": "https://i.ibb.co/ZszCb1b/WAR-Certificate-of-creative-excellence.jpg",
    "cert_participation.webp": "https://i.ibb.co/gb5mrRYw/WAR-Certificate-of-participation.jpg",
    "artist_id_card.webp": "https://i.ibb.co/nN3YSwdB/Winter-art-riyal-ID-card.jpg",

    // Recognition Marquee
    "recognition_1.webp": "https://i.ibb.co/WmzSWRc/Sliding-recognition-1-2.jpg",
    "recognition_2.webp": "https://i.ibb.co/tTbmdXzR/Sliding-recognition-1-1.jpg",
    "recognition_3.webp": "https://i.ibb.co/HpL7cQKS/Sliding-recognition-1.jpg",

    // Kit Images
    "kit_1.webp": "https://i.ibb.co/bjVyrwd0/Whats-App-Image2026-01-08at5-26-11-PM.jpg",
    "kit_2.webp": "https://i.ibb.co/21GKJVbk/Whats-App-Image2026-01-08at5-26-11-PM1.jpg",
    "kit_3.webp": "https://i.ibb.co/4RKjQd5N/Whats-App-Image2026-01-08at5-26-12-PM.jpg",
    "kit_4.webp": "https://i.ibb.co/PsTc3vV5/Whats-App-Image2026-01-08at5-26-12-PM1.jpg",
    "kit_5.webp": "https://i.ibb.co/WN5X2zcY/Whats-App-Image2026-01-08at5-26-13-PM.jpg",
    "kit_6.webp": "https://i.ibb.co/WvRt0Rs9/Whats-App-Image2026-01-08at5-26-13-PM1.jpg",
    "kit_7.webp": "https://i.ibb.co/DD6kbDc0/Whats-App-Image2026-01-08at5-26-12-PM2.jpg",
    "kit_8.webp": "https://i.ibb.co/wn4ZXbL/Whats-App-Image2026-01-08at5-26-15-PM.jpg",
    "kit_9.webp": "https://i.ibb.co/bMZDJTgm/Whats-App-Image2026-01-08at5-26-14-PM1.jpg",
    "kit_10.webp": "https://i.ibb.co/d0QdtvLp/Whats-App-Image2026-01-08at5-26-14-PM.jpg",
    "kit_11.webp": "https://i.ibb.co/FLHwZM4r/Whats-App-Image2026-01-08at5-26-13-PM2.jpg",

    // Snapshots
    "snapshot_1.webp": "https://i.ibb.co/LXMnjMLz/IMG-20250915-171938-11zon.jpg",
    "snapshot_2.webp": "https://i.ibb.co/b5WmDsgm/IMG-20250915-133022-11zon.jpg",
    "snapshot_3.webp": "https://i.ibb.co/fYJz2x2j/IMG-20250915-132857-11zon.jpg",
    "snapshot_4.webp": "https://i.ibb.co/hxqkWzyk/IMG-20250915-132944-11zon.jpg",
    "snapshot_5.webp": "https://i.ibb.co/qLYnPNPD/IMG-20250915-130155-11zon.jpg",
    "snapshot_6.webp": "https://i.ibb.co/67Fh2bGj/IMG-20250915-130115-11zon.jpg",
    "snapshot_7.webp": "https://i.ibb.co/wFPN7RDg/Screenshot-2025-09-16-13-58-31-33-6012fa4d4ddec268fc5c7112cbb265e7-11zon.jpg"
};

async function downloadAndOptimize() {
    let count = 0;
    console.log(`Starting optimization of ${Object.keys(assets).length} assets...`);

    for (const [filename, url] of Object.entries(assets)) {
        const outputPath = path.join(outputDir, filename);

        try {
            console.log(`[${++count}/${Object.keys(assets).length}] Processing: ${filename}`);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await sharp(buffer)
                .resize(600, null, { withoutEnlargement: true }) // Reasonable max width for most assets
                .webp({ quality: 80, effort: 4 })
                .toFile(outputPath);

            console.log(`   ✅ Saved: /optimized_assets/${filename}`);
        } catch (err) {
            console.error(`   ❌ Error: ${err.message}`);
        }
    }
    console.log('\n🎉 Optimization Complete!');
}

downloadAndOptimize();
