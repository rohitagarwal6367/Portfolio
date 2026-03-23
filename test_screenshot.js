const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:8080/index.html?v=11', { waitUntil: 'networkidle0' });
  
  // Click the first certificate
  await page.waitForSelector('.cert-item');
  await page.click('.cert-item');
  
  // Wait for modal to appear
  await page.waitForSelector('#cert-modal:not(.hidden)');
  await page.waitForTimeout(500); // wait for fade in
  
  await page.screenshot({ path: 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\fb87f119-3d96-4570-a0e2-39935fb3078d\\cert_modal_perfect.png' });
  
  await browser.close();
  console.log('Screenshot saved!');
})();
