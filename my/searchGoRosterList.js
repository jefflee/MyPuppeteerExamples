const puppeteer = require('puppeteer');

//Example: evaluate script in the context of the page
(async () => {
    const browser = await puppeteer.launch({ headless: false }); // default is true

    const page = await browser.newPage();
    await page.goto('http://www.weiqi.org.tw/RosterQuery.asp');


    await browser.close();
})();