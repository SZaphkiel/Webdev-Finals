document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const mainImage1 = urlParams.get('mainImage1');
    const productName = urlParams.get('productName');
    const productPrice = urlParams.get('productPrice');

    if (mainImage1) {
        document.getElementById('mainImage1').src = mainImage1;
    }
    if (productName) {
        document.getElementById('productName').textContent = productName;
    }
    if (productPrice) {
        document.getElementById('productPrice').innerHTML = "&#8369;" + productPrice;
    }

    const addToCartButton = document.getElementById('addToCartBtn');
    addToCartButton.addEventListener('click', function() {
        const productCard = addToCartButton.closest('.productCard');
        const productName = productCard.querySelector('#productName').textContent;
        const productSize = productCard.querySelector('#shoeSize').value;
        const productQuantity = parseInt(productCard.querySelector('#quantity').value);
        const productPrice = parseFloat(productCard.querySelector('#productPrice').textContent.replace(/[^\d.]/g, ''));

        if (productQuantity > 0) {
            var url = 'shoppingCart.html?productName=' + productName + 
                      '&productSize=' + productSize + 
                      '&productQuantity=' + productQuantity + 
                      '&productPrice=' + productPrice;
            window.location.href = url;
        } else {
            alert('Please enter a valid quantity.');
        }
    });
});
