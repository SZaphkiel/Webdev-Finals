document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('productName');
    const productSize = urlParams.get('productSize');
    const productQuantity = parseInt(urlParams.get('productQuantity'));
    const productPrice = parseFloat(urlParams.get('productPrice'));

    const cartItemContainer = document.querySelector('.cartItem');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    if (productName && productSize && productQuantity > 0 && productPrice) {
        const totalPrice = productPrice * productQuantity;

        cartItemContainer.innerHTML = `
            <div class="cartItem">
                <div class="cartItemInfo">
                    <p>${productName}</p>
                    <p>Size: ${productSize}</p>
                    <p>Quantity: ${productQuantity}</p>
                    <p>Total Price: &#8369;${totalPrice.toFixed(2)}</p>
                </div>
            </div>
        `;

        const subtotal = parseFloat(subtotalElement.textContent) + totalPrice;
        subtotalElement.textContent = subtotal.toFixed(2);
        totalElement.textContent = subtotal.toFixed(2);
    } else {
        const cartEmptyMessage = document.querySelector('.cartEmptyMessage');
        cartEmptyMessage.style.display = 'block';
    }
});