document.getElementById('fetchItemDetails').addEventListener('click', async function() {
    const itemUrl = document.getElementById('itemUrl').value;
    try {
        const response = await fetch('/fetch-item-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemUrl })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch item details');
        }

        const result = await response.json();
        document.getElementById('response').innerHTML = `
            <h2>Item Details</h2>
            <p>Name: ${result.name}</p>
            <p>Price: ${result.price}</p>
            <p>Sizes: ${result.sizes.join(', ')}</p>
        `;
    } catch (error) {
        console.error('Error fetching item details:', error);
        document.getElementById('itemDetails').innerText = 'Error fetching item details';
    }
});

document.getElementById('addItemForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const itemUrl = document.getElementById('itemUrl').value;
    const itemSize = document.getElementById('itemSize').value;

    try {
        const response = await fetch('/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ itemUrl, itemSize })
        });
        const result = await response.text();

        if (!response.ok) {
            throw new Error(result);
        }

        
        document.getElementById('response').innerHTML = `
            <h2>${result}</h2>
        `;
    } catch (error) {
        document.getElementById('response').innerHTML = `
            <h2>${error}</h2>
        `;
    }
});