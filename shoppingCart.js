document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');
    const productSize = urlParams.get('productSize');
    const productQuantity = parseInt(urlParams.get('productQuantity'));
    const productPrice = parseFloat(urlParams.get('productPrice'));

    const cartItemContainer = document.querySelector('.cartItemContainer');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const cartEmptyMessage = document.querySelector('.cartEmptyMessage');

    if (productName && productSize && productQuantity > 0 && productPrice) {
        const totalPrice = productPrice * productQuantity;

        // Check if the item already exists in the cart
        let existingItem = null;
        const items = cartItemContainer.querySelectorAll('.item');
        items.forEach(item => {
            const itemName = item.querySelector('.itemName').textContent;
            const itemSize = item.querySelector('.itemSize').textContent.replace('Size: ', '');
            if (itemName === productName && itemSize === productSize) {
                existingItem = item;
            }
        });

        if (existingItem) {
            // Update existing item
            const itemQuantityElement = existingItem.querySelector('.itemQuantity');
            const itemPriceElement = existingItem.querySelector('.itemPrice');

            const currentQuantity = parseInt(itemQuantityElement.textContent.replace('Quantity: ', ''));
            const newQuantity = currentQuantity + productQuantity;
            const newPrice = productPrice * newQuantity;

            itemQuantityElement.textContent = `Quantity: ${newQuantity}`;
            itemPriceElement.textContent = `Total Price: &#8369;${newPrice.toFixed(2)}`;
        } else {
            // Add new item
            const cartItem = document.createElement('div');
            cartItem.className = 'item';
            cartItem.innerHTML = `
                <div class="itemDetails">
                    <p class="itemName">${productName}</p>
                    <p class="itemSize">Size: ${productSize}</p>
                    <p class="itemQuantity">Quantity: ${productQuantity}</p>
                    <p class="itemPrice">Total Price: &#8369;${totalPrice.toFixed(2)}</p>
                </div>
                <button class="btn removeBtn" onclick="removeItem(this)">Remove</button>
            `;

            cartItemContainer.appendChild(cartItem);
        }

        const subtotal = parseFloat(subtotalElement.textContent) + totalPrice;
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);

        cartEmptyMessage.style.display = 'none';
    } else {
        cartEmptyMessage.style.display = 'block';
    }
});

function removeItem(button) {
    const item = button.parentElement;
    const itemPrice = parseFloat(item.querySelector('.itemPrice').textContent.replace('Total Price: ₱', ''));
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    item.remove();

    const subtotal = parseFloat(subtotalElement.textContent) - itemPrice;
    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2);

    if (subtotal <= 0) {
        document.querySelector('.cartEmptyMessage').style.display = 'block';
    }
}
