const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const http = require('http');

// Define where dev server runs and where to save images
const BASE_URL = 'http://localhost:3000/demo';
const PUBLIC_THUMBNAILS_DIR = path.join(__dirname, '..', 'public', 'thumbnails');
const DEMO_DIR = path.join(__dirname, '..', 'app', 'demo');

// Ensure thumbnails directory exists
if (!fs.existsSync(PUBLIC_THUMBNAILS_DIR)) {
  fs.mkdirSync(PUBLIC_THUMBNAILS_DIR, { recursive: true });
}

function waitForServer(url, timeoutMs = 120000) {
  console.log(`Waiting for server at ${url} to be ready...`);
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    function attempt() {
      if (Date.now() - startTime > timeoutMs) {
        return reject(new Error('Timeout waiting for server to start.'));
      }
      const req = http.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log('Server is ready!');
          resolve();
        } else {
          setTimeout(attempt, 2000);
        }
      }).on('error', () => {
        setTimeout(attempt, 2000);
      });
      req.end();
    }
    attempt();
  });
}

async function captureThumbnails() {
  await waitForServer(BASE_URL);
  
  console.log('Starting thumbnail generation...');
  
  // Find all routing folders in app/demo/
  const entries = fs.readdirSync(DEMO_DIR, { withFileTypes: true });
  const routes = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  console.log(`Found demo routes: ${routes.join(', ')}`);

  const browser = await puppeteer.launch({
    headless: "new"
  });
  
  const page = await browser.newPage();
  
  // Set viewport to a standard desktop 16:9 ratio (e.g., 1920x1080)
  await page.setViewport({ width: 1920, height: 1080 });

  for (const route of routes) {
    const url = `${BASE_URL}/${route}`;
    const outputPath = path.join(PUBLIC_THUMBNAILS_DIR, `${route}.png`);
    
    console.log(`\nCapturing: ${route}`);
    console.log(`URL: ${url}`);
    
    try {
      // Go to the page and wait for network to be largely idle
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      
      // Additional wait just to ensure any animations or fonts settle
      await new Promise(r => setTimeout(r, 2000));
      
      // Take screenshot of the Viewport (Above the Fold)
      await page.screenshot({
        path: outputPath,
        type: 'png'
      });
      console.log(`✅ Saved thumbnail at public/thumbnails/${route}.png`);
    } catch (e) {
      console.error(`❌ Failed to capture ${route}:`, e);
    }
  }

  await browser.close();
  console.log('\nDone! All thumbnails generated.');
}

captureThumbnails().catch(console.error);
