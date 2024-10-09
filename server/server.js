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

    await page.goto('https://www.kisacoresearch.com/events/memorycon/partners', {
      waitUntil: 'networkidle0',
    });

    // Extracting images without specific CSS selectors
    const sponsors = await page.evaluate(() => {
      const imgs = Array.from(document.images); // Get all image elements
      return imgs
        .map((img, index) => ({
          id: index + 1,
          name: img.alt || `Sponsor ${index + 1}`,
          imageUrl: img.src,
        }))
        .filter(sponsor => sponsor.imageUrl.includes('/wp-content/uploads/') && sponsor.name.includes('sponsor')); // Filter for sponsor images
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
