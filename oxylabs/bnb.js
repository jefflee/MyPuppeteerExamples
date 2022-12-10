const puppeteer = require("puppeteer");
(async () => {
    let url = "https://www.airbnb.com/s/homes?refinement_paths%5B%5D=%2Fhomes&search_type=section_navigation&property_type_id%5B%5D=8";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2',
    });
    data = await page.evaluate(() => {
        hotels = Array.from(document.querySelectorAll("#FMP-target")).map(hotel => ({
            // Name: hotel.querySelector('meta [itemprop="name"]'),
            Photo: hotel.getAttribute("src"),
            Test: 'Test Property',
        }));
        return hotels;
    });
    console.log(data);
    await browser.close();
})();