
    document.addEventListener('DOMContentLoaded', function () {
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
