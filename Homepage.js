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
                    url.searchParams.append('name', product.name);
                    url.searchParams.append('price', product.price);
                    url.searchParams.append('image', product.image);

                    window.location.href = url.toString();
                });
                suggestionsContainer.appendChild(suggestionItem);
            });

            if (suggestions.length > 0) {
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }





