document.addEventListener("DOMContentLoaded", function() {
    let qCards = document.querySelectorAll('.qCards');

    for (let i = 0; i < qCards.length; i++) {
        qCards[i].addEventListener('click', function(event) {
            let qNa = this.querySelector('.qNa');
            let qArrow = this.querySelector('.qArrow');

            if (qNa.classList.contains('show')) {
                qNa.classList.remove('show');
            } else {
                qNa.classList.add('show');
            }

            if (qArrow.classList.contains('rotated')) {
                qArrow.classList.remove('rotated');
            } else {
                qArrow.classList.add('rotated');
            }
        });
    }
});
