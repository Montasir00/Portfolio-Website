import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = path.join(__dirname, '../public/assets/images');

const CONFIG = {
    regularWidth: 800,
    wideWidth: 1600,
    quality: 85,
};

async function processDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                await optimizeImage(fullPath);
            }
        }
    }
}

async function optimizeImage(filePath) {
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const dirName = path.dirname(filePath);
    const outputPath = path.join(dirName, `${baseName}.webp`);

    const isWide = baseName.toLowerCase().includes('wide');
    const targetWidth = isWide ? CONFIG.wideWidth : CONFIG.regularWidth;

    console.log(`Optimizing: ${baseName}${ext} -> ${baseName}.webp (${targetWidth}px)`);

    try {
        await sharp(filePath)
            .resize({ width: targetWidth, withoutEnlargement: true })
            .webp({ quality: CONFIG.quality })
            .toFile(outputPath);

        // Remove the original file after successful conversion
        await fs.unlink(filePath);
        console.log(`  Done. Original removed.`);
    } catch (err) {
        console.error(`  Error processing ${filePath}:`, err.message);
    }
}

console.log('Starting Image Optimization...');
processDirectory(IMAGE_DIR)
    .then(() => console.log('Optimization Complete!'))
    .catch(err => console.error('Optimization Failed:', err));
