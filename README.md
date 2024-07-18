# Shein Automation Project
A project to automate adding items to the cart on Shein using Puppeteer and a custom admin portal.

# Introduction

This project utilizes Node.js and Puppeteer to automate interactions with e-commerce websites, enabling seamless fetching of item details and automated addition to cart functionalities.

# Setup and Usage


Before running the application, ensure you have the following installed:
Node.js , npm 


# Installation

Clone the repository:

git clone https://github.com/bishernob/shein-automation.git
cd shein-automation

Install dependencies:
npm install

# Running the Application

To start the application, follow these steps:

Start the server:

npm start

This command will launch the Node.js server.

# Access the Admin Panel:

Open your web browser and go to http://localhost:3000/admin_panel.html to access the admin panel.

# Using the Admin Panel

Fetch Item Details:

Enter the URL of the product and click "Fetch Item Details" to retrieve details such as name, price, and available sizes.
The details will be displayed on the page.

Add Item to Cart:
Enter the URL of the product and the desired size.
Click "Add to Cart" to add the item to the cart.
The response message, indicating success or failure, will be displayed on the page.

Verify Setup Scripts
To ensure everything is set up correctly, you can run the verification scripts provided:

npm run verifysetup
This script will check dependencies, configurations, and basic functionality to verify that the application is ready to use.

# Limitations and Considerations

Headless Mode Issues:

Attempting to perform operations like fetching item details or adding items to the cart using Puppeteer's headless mode (headless: true) encountered issues that prevented successful automation. As a result, the project currently relies on headless: false for these tasks.
External Website Errors:

Accessing external websites like Shein sometimes triggers CAPTCHA challenges or access timeouts, which can interrupt the automation flow. If encountered, manual intervention may be required to resolve these issues before automated processes can continue.
