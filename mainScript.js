document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();

    // Common functionality: Search suggestions
    if (document.getElementById('searchBar')) {
        document.getElementById('searchBar').addEventListener('input', showSuggestions);
    }

    // Function to handle search suggestions
    function showSuggestions() {
        const input = document.getElementById('searchBar').value.toLowerCase();
        const suggestionsContainer = document.getElementById('searchSuggestions');
        suggestionsContainer.innerHTML = '';

        if (input) {
            const productCards = document.querySelectorAll('.shoeCard');
            const suggestions = [];

            productCards.forEach(card => {
                const name = card.querySelector('.shoeName').textContent.toLowerCase();
                const price = card.querySelector('.shoePrice').textContent;
                const image = card.querySelector('.cardImg img').src;

                if (name.includes(input)) {
                    suggestions.push({ name, price, image });
                }
            });

            suggestions.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'searchSuggestionItem';
                suggestionItem.innerHTML = `<img src="${product.image}" alt="${product.name}"><span>${product.name} - ${product.price}</span>`;
                suggestionItem.addEventListener('click', () => {
                    const url = new URL('productPage.html', window.location.origin);
                    url.searchParams.append('mainImage1', product.image);
                    url.searchParams.append('productName', product.name);
                    url.searchParams.append('productPrice', product.price);

                    window.location.href = url.toString();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });

            suggestionsContainer.style.display = suggestions.length > 0 ? 'block' : 'none';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    // Specific functionality for index.html: Handling product buttons click
    if (currentPage === 'index.html') {
        const buttons = document.querySelectorAll('.cardBtn');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const image = this.getAttribute('data-image');
                const name = this.getAttribute('data-name');
                const price = this.getAttribute('data-price');

                const url = new URL('productPage.html', window.location.origin);
                url.searchParams.append('mainImage1', image);
                url.searchParams.append('productName', name);
                url.searchParams.append('productPrice', price);

                window.location.href = url.toString();
            });
        });
    }

    // Specific functionality for productPage.html: Handling product page loading and add to cart functionality
    if (currentPage === 'productPage.html') {
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
            document.getElementById('productPrice').innerHTML = `&#8369;${productPrice}`;
        }

        // Add to cart functionality
        const addToCartButton = document.getElementById('addToCartBtn');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function() {
                const productCard = addToCartButton.closest('.productCard');
                const productName = productCard.querySelector('#productName').textContent;
                const productSize = productCard.querySelector('#shoeSize').value;
                const productQuantity = parseInt(productCard.querySelector('#quantity').value);
                const productPrice = parseFloat(productCard.querySelector('#productPrice').textContent.replace(/[^\d.]/g, ''));

                if (productQuantity > 0) {
                    const url = new URL('shoppingCart.html', window.location.origin);
                    url.searchParams.append('productName', productName);
                    url.searchParams.append('productSize', productSize);
                    url.searchParams.append('productQuantity', productQuantity);
                    url.searchParams.append('productPrice', productPrice);

                    window.location.href = url.toString();
                } else {
                    alert('Please enter a valid quantity.');
                }
            });
        }
    }

    // Specific functionality for shoppingCart.html: Handle shopping cart operations
    if (currentPage === 'shoppingCart.html') {
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
                        <p class="itemPrice">Total Price: &#8369;${(productPrice * productQuantity).toFixed(2)}</p>
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
    }

    // Function to remove item from cart
    window.removeItem = function(button) {
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
});

// HOMEPAGE
// image looping
const loopImgArray = [
    './mainResources/Discount.png',
    '/mainResources/Voucher.png',
    '/mainResources/Women shoes.png'
];

const imageElement = document.getElementById('loopingImages');
let currentIndex = 0;

function imageLooping() {
    imageElement.classList.add('hidden');
    
    setTimeout(() => {
        imageElement.src = loopImgArray[currentIndex];
        imageElement.classList.remove('hidden');
        currentIndex = (currentIndex + 1) % loopImgArray.length;
    }, 500); 
}

imageLooping();

setInterval(imageLooping, 4000);

// IMAGE LOOPING DOTS

const dotsContainer = document.getElementById('dotsContainer');

for (let i = 0; i < loopImgArray.length; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function dotClickHandler(event) {
    const dotIndex = event.target.getAttribute('data-index');
    currentIndex = parseInt(dotIndex);
    imageLooping();
}

dots.forEach(dot => {
    dot.addEventListener('click', dotClickHandler);
});


function updateActiveDot() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Best seller
document.querySelector('.prev').addEventListener('click', function() {
    document.querySelector('.cardsContainer').scrollBy({
        top: 0,
        left: -300, 
        behavior: 'smooth'
    });
});

document.querySelector('.next').addEventListener('click', function() {
    document.querySelector('.cardsContainer').scrollBy({
        top: 0,
        left: 300, 
        behavior: 'smooth'
    });
});

// CHATABOT 

document.addEventListener('DOMContentLoaded', function() {
    let chatbotButton = document.getElementById('chatbotButton');
    let chatbotPopup = document.getElementById('chatbotPopup');
    let closeButton = document.getElementById('closeButton');
    let userInput = document.getElementById('userInput');
    let sendButton = document.getElementById('sendButton');
    let chatContent = document.getElementById('chatContent');

    let isUserTurn = true;

    chatbotButton.addEventListener('click', function() {
        chatbotPopup.style.display = 'block';
        chatbotPopup.classList.add('open');
    });

    closeButton.addEventListener('click', function() {
        chatbotPopup.classList.remove('open');
        chatbotPopup.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == chatbotPopup) {
            chatbotPopup.classList.remove('open');
            chatbotPopup.style.display = 'none';
        }
    };

    function handleChoice(action) {
        let response = "";
        switch (action) {
            case "track_order":
                response = "Please provide your order number and we will track it for you.";
                break;
            case "return_refund":
                response = "Sure, we can assist you with returns and refunds. Please check our return policy on our website for more details.";
                break;
            case "cancellation_concern":
                response = "If you want to cancel your order, please contact our customer support team for assistance.";
                break;
            default:
                response = "I'm sorry, I didn't understand that choice.";
                break;
        }

        appendMessage(response, false);
    }

    function appendMessage(message, isUser) {
        let messageElement = document.createElement('div');
        messageElement.className = 'message';
        if (isUser) {
            messageElement.classList.add('user');
        } else {
            messageElement.classList.add('bot');
        }
        messageElement.textContent = message;
        chatContent.appendChild(messageElement);
    }

    let choiceButtons = document.querySelectorAll('.choice');
    choiceButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let action = button.getAttribute('data-action');
            handleChoice(action);
        });
    });

    sendButton.addEventListener('click', function() {
        let userMessage = userInput.value.trim();
        if (userMessage !== '') {
            appendMessage(userMessage, true);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});

// scroll smooth
document.getElementById('bestSellersLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('bestSellers').scrollIntoView({ behavior: 'smooth' });
});

// Mainshopping
