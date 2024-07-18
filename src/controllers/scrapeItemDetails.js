const puppeteer = require('puppeteer');

const scrapeItemDetails = async (req,res)=> {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();
    const {itemUrl} = req.body
    try {
        await page.goto(itemUrl, { waitUntil: 'domcontentloaded' });

         await page.waitForSelector('.product-intro__head-name');
         await page.waitForSelector('.ProductIntroHeadPrice__head-mainprice');
         await page.waitForSelector('.product-intro__size-choose span');

        const itemDetails = await page.evaluate(() => {
            const nameElement = document.querySelector('.product-intro__head-name').innerHTML;
            const priceElement = document.querySelector('.ProductIntroHeadPrice__head-mainprice').textContent;
            const sizeElements = document.querySelectorAll('.product-intro__size-choose span');

            const name = nameElement ? nameElement.trim() : null;
            const price = priceElement ? priceElement.trim() : null;
            const sizes = sizeElements.length > 0 ? Array.from(sizeElements).map(el => el.textContent) : [];

            return { name, price, sizes };
        });

        if (!itemDetails.name || !itemDetails.price || itemDetails.sizes.length === 0) {
            throw new Error('Failed to retrieve all item details.');
        }
        return res.status(200).send(itemDetails) ;

    } catch (error) {
        console.log('Error scraping item details: ' + error);
        return res.status(404).send({ error: error.message })
    } finally {
        await browser.close();
    }
}

module.exports = {scrapeItemDetails};
