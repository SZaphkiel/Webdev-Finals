document.querySelectorAll('.qCards').forEach(card => {
    card.addEventListener('click', () => {
        const answer = card.querySelector('.qNa');
        const arrow = card.querySelector('.qArrow');
        if (answer.classList.contains('show')) {
            answer.classList.remove('show');
            arrow.classList.remove('rotated');
        } else {
            document.querySelectorAll('.qNa').forEach(answer => answer.classList.remove('show'));
            document.querySelectorAll('.qArrow').forEach(arrow => arrow.classList.remove('rotated'));
            answer.classList.add('show');
            arrow.classList.add('rotated');
        }
    });
});
