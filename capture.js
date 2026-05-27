const puppeteer = require('puppeteer');
const fs = require('fs');
const { setTimeout } = require('timers/promises');

(async () => {
  if (!fs.existsSync('./screenshots')) fs.mkdirSync('./screenshots');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log("Logging in as farmer...");
  await page.goto('http://localhost:5173/login');
  await setTimeout(1000);
  await page.type('input[type="email"]', 'rattaiah@gmail.com');
  await page.type('input[type="password"]', '123456789');
  await page.click('button.btn-block');
  await setTimeout(2000); // wait to load dashboard
  
  console.log("Capturing Farmer Dashboard...");
  await page.goto('http://localhost:5173/farmer');
  await setTimeout(1000);
  await page.screenshot({ path: 'screenshots/farmer_dashboard.png' });

  await browser.close();
  console.log("Screenshots captured!");
})();
