const puppeteer = require('puppeteer');

const addToCart = async (req,res) =>{
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const {itemUrl, itemSize} = req.body
    try {
        await page.goto(itemUrl, { waitUntil: 'domcontentloaded' });
        const initialCartNumber = await page.evaluate(() => {
            const cartNumElement = document.querySelector('.cart-num');
            return cartNumElement ? parseInt(cartNumElement.innerText) : 0;
        });

        await page.waitForSelector(`div[data-attr_value_name]`);
        const sizeElement =  await page.$(`div[data-attr_value_name="${itemSize}"]`);
        if (sizeElement) {
            await sizeElement.click();
        } else {
            throw new Error(`Size ${itemSize} not found.`);
        }

        //Click add to cart button
        await page.waitForSelector('#ProductDetailAddBtn');
        page.click('#ProductDetailAddBtn');

        // Wait for the cart to be updated
        await page.waitForFunction(
            (initialCartNumber) => {
                const cartNumElement = document.querySelector('.cart-num');
                return cartNumElement && parseInt(cartNumElement.innerText) > initialCartNumber;
            },
            { timeout: 10000 },
            initialCartNumber
        );

    // Get the updated cart number
    const updatedCartNumber = await page.evaluate(() => {
        const cartNumElement = document.querySelector('.cart-num');
        return cartNumElement ? parseInt(cartNumElement.innerText) : 0;
    });

    //compare number of items before and after added the item
    if (updatedCartNumber > initialCartNumber) {
        return res.status(200).send('Item added to cart successfully!') 
    } else {
        throw new Error('Item was not added to the cart.');
    }
    } catch (error) {
        console.log(error)
        return res.status(404).send( error.message ) ;
    } 
    finally {
        await browser.close();
    }
}

module.exports = {addToCart};
