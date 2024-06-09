const productButtons = document.querySelectorAll('.cardBtn');

const buttonArray = [];

for (let i = 0; i < productButtons.length; i++) {
    buttonArray.push(productButtons[i]);
}

buttonArray.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        handleButtonClick(index); 
        document.location.href = 'productPage.html'; 
    });
});

const productName = document.getElementById('productName');

function handleButtonClick(index) {
    console.log("Button clicked:", index);
    switch (index) {
        case 0:
            productName.innerHTML += "Bagong shoes"
            break;
        case 1:
            // Add functionality for button 2
            break;
    }
}
