document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.productCard button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = button.closest('.productCard');
            const productName = productCard.querySelector('#productName').textContent;
            const productSize = productCard.querySelector('#shoeSize').value;
            const productQuantity = parseInt(productCard.querySelector('#quantity').value);
            const productPrice = parseFloat(productCard.querySelector('#productPrice').textContent.replace(/[^\d.]/g, ''));
            
            if (productQuantity > 0) {
                const url = `shoppingCart.html?productName=${productName}&productSize=${productSize}&productQuantity=${productQuantity}&productPrice=${productPrice}`;
                window.location.href = url;
            } else {
                alert('Please enter a valid quantity.');
            }
        });
    });
});