// server/server.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/sponsors', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://oxfordglobal.com/cell/sponsors/', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Extracting images without specific CSS selectors
    const sponsors = await page.evaluate(() => {
      const imgs = Array.from(document.images); // Get all image elements

      // Define keywords for filtering relevant sponsor images
      const keywords = ['sponsor', 'our-sponsors', 'partners', 'partnership', 'partners-with'];

      const uniqueImages = new Set(); // Store unique image URLs
      return imgs
        .map((img, index) => ({
          id: index + 1,
          name: img.alt || `Sponsor ${index + 1}`,
          imageUrl: img.src,
        }))
        .filter(sponsor => {
          // Check if any keyword appears in the alt text or image URL
          const isKeywordInName = keywords.some(keyword => sponsor.name.toLowerCase().includes(keyword));
          const isKeywordInUrl = keywords.some(keyword => sponsor.imageUrl.toLowerCase().includes(keyword));

          // Only add to Set if it matches the keywords and is unique
          if ((isKeywordInName || isKeywordInUrl) && !uniqueImages.has(sponsor.imageUrl)) {
            uniqueImages.add(sponsor.imageUrl); // Add to Set to keep track
            return true;
          }
          return false;
        });
    });

    console.log('Extracted sponsors:', sponsors);
    await browser.close();

    res.json(sponsors);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({ error: 'Failed to fetch sponsors', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
