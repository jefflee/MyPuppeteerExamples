const puppeteer = require("puppeteer");
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/Web_scraping");
  
  title = await page.evaluate(() => {
    return document.querySelector("#firstHeading").textContent.trim();
  });
  console.log(title);
  await browser.close();
})();