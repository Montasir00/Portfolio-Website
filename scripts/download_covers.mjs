import fs from 'fs';
import path from 'path';
import https from 'https';

const books = [
    { title: "The Holy Quran", author: "Divine Revelation", id: "quran" },
    { title: "Ami Topu", author: "Muhammed Zafar Iqbal", id: "amitopu" },
    { title: "Can't Hurt Me", author: "David Goggins", id: "goggins" },
    { title: "Meditations", author: "Marcus Aurelius", id: "meditations" },
    { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", id: "7habits" },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", id: "richdad" },
    { title: "How to Win Friends and Influence People", author: "Dale Carnegie", id: "dalecarnegie" },
    { title: "The Miracle Morning", author: "Hal Elrod", id: "miraclemorning" },
    { title: "Awaken the Giant Within", author: "Tony Robbins", id: "awaken" },
    { title: "Ikigai", author: "Héctor García", id: "ikigai" },
    { title: "Amar Bondhu Rashed", author: "Muhammed Zafar Iqbal", id: "rashed" },
    { title: "Dipu Number Two", author: "Muhammed Zafar Iqbal", id: "dipu2" },
    { title: "Tuntuni ar Chotaccu", author: "Muhammed Zafar Iqbal", id: "tuntuni" },
    { title: "Feluda", author: "Satyajit Ray", id: "feluda" },
    { title: "Science Fiction Somogro", author: "Muhammed Zafar Iqbal", id: "scifisomogro" },
    { title: "Ikarus", author: "Muhammed Zafar Iqbal", id: "ikarus" },
    { title: "Wattpad", author: "Various Authors", id: "wattpad" },
];

const destDir = path.join(process.cwd(), 'public', 'assets', 'images', 'books');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

async function searchCover(title, author) {
    return new Promise((resolve) => {
        const query = encodeURIComponent(`${title} ${author}`);
        const url = `https://openlibrary.org/search.json?q=${query}&limit=3`;

        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    const docsWithCovers = result.docs && result.docs.length > 0 ? result.docs.filter(d => d.cover_i) : [];
                    if (docsWithCovers.length > 0) {
                        resolve(docsWithCovers[0].cover_i);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', () => resolve(null));
    });
}

function httpsGetFollowRedirects(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                let redirectUrl = res.headers.location;
                if (!redirectUrl.startsWith('http')) {
                    const urlObj = new URL(url);
                    redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
                }
                httpsGetFollowRedirects(redirectUrl, dest).then(resolve).catch(reject);
            } else {
                reject(new Error(`Status ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

(async () => {
    console.log("Starting book cover downloads...");
    for (const book of books) {
        console.log(`Searching for: ${book.title}...`);
        let coverId = await searchCover(book.title, book.author);

        if (!coverId) {
            console.log(`  Cover not found with author. Trying just title...`);
            coverId = await searchCover(book.title, "");
        }

        if (coverId) {
            const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            const destPath = path.join(destDir, `${book.id}.jpg`);
            console.log(`  Found cover ID: ${coverId}. Downloading...`);
            try {
                await httpsGetFollowRedirects(coverUrl, destPath);
                console.log(`  -> Saved to ${destPath}`);
            } catch (e) {
                console.log(`  -> Failed to download: ${e.message}`);
            }
        } else {
            console.log(`  -> No cover found for ${book.title} on Open Library. Saving placeholder...`);
            const placeholderUrl = `https://picsum.photos/seed/${book.id}/400/600`;
            const destPath = path.join(destDir, `${book.id}.jpg`);
            try {
                await httpsGetFollowRedirects(placeholderUrl, destPath);
                console.log(`  -> Saved placeholder to ${destPath}`);
            } catch (e) {
                console.log(`  -> Failed to download placeholder: ${e.message}`);
            }
        }
    }
    console.log("Done.");
})();
