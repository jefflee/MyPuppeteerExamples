const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1600,
        height: 900,
    });
    await page.goto('https://oxylabs.io/');
    await page.screenshot({ path: 'oxylabs_1080.png' })
    //await browser.close();
})();