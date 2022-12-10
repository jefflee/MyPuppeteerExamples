const puppeteer = require("puppeteer");
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://en.wikipedia.org/wiki/Web_scraping");
 
  headings = await page.evaluate(() => {
    headings_elements = document.querySelectorAll("h2 .mw-headline");
    headings_array = Array.from(headings_elements);
    return headings_array.map(heading => heading.textContent);
  });
  console.log(headings);
  await browser.close();
})();