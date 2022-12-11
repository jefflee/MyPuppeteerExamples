const puppeteer = require('puppeteer');
const fs = require('fs');

const mode = 'scraping' // search or scraping
const pageSize = 5000;
let targetName = 'JeffLee';
let finalResult = [];

(async () => {
    const browser = await puppeteer.launch({ headless: true }); // default is true

    const page = await browser.newPage();
    for (let k = 1; k <= 8; k++) {
        await page.goto(`http://www.weiqi.org.tw/RosterList.asp?RosterLevel=${k}`);
        let pageNumber = 1;
        await Search(page, k, pageNumber);
    }

    if (mode == 'search') {
        console.log('Final result =');
        console.log(finalResult);
    } else {
        fs.writeFile('my/goRosterList.txt', JSON.stringify(finalResult), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        })
    }
    await browser.close();
})();

async function Search(puppeteerPage, level, pageNumber) {
    console.log(`Browsing level=${level}, pageNumber=${pageNumber}`);

    await puppeteerPage.goto(`http://www.weiqi.org.tw/RosterList.asp?nowPage=${pageNumber}&pagesize=${pageSize}&RosterLevel=${level}`);
    data = await puppeteerPage.evaluate(() => {
        let trData = Array.from(document.querySelectorAll("body > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(3) > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table:nth-child(5) > tbody > tr"))
            .map(tr => {
                let divs = tr.querySelectorAll('td div')
                return {
                    no: divs[0].textContent,
                    name: divs[1].textContent,
                    yearOfbirth: divs[2].textContent,
                    level: divs[3].textContent,
                }
            });
        return trData;
    });
    // console.log(data);

    if (mode == 'search') {
        matchRecords = data.filter(e => e.name == targetName);
        console.log(matchRecords);
        if (matchRecords.length > 0) {
            finalResult = [...finalResult, ...matchRecords];
        }
    } else {
        finalResult = [...finalResult, ...data];
    }

    hasNextPageBtn = await puppeteerPage.evaluate(() => {
        let htmlNode = document.querySelector('html');
        if (htmlNode.innerText.indexOf('下一頁') >= 0) {
            return true;
        }
        return false;
    });

    if (hasNextPageBtn == true) {
        await Search(puppeteerPage, level, pageNumber + 1);
    }
};