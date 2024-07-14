const pupperteer = require('puppeteer');

(async ()=>{
    try {
        const browser = await pupperteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.shein.com');
        console.log('Accessed Shein website');
        await browser.close();
    }
    catch(error) {
        console.error('Error occurred' , error)
    }
})();