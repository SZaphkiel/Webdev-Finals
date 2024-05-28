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
