
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
