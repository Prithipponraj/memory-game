document.addEventListener('DOMContentLoaded', () => {
    const cardImages = ['❤', '🎂', '🍰', '🍥', '🍞', '🧀', '🍗', '🍤'];
    let gameBoard = document.getElementById('game-board');
    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    // Duplicate and shuffle the card images..

    const shuffledImages = shuffle([...cardImages, ...cardImages]);

    // Create the cards..

    shuffledImages.forEach((image, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.image = image;

        // Card Front (Hidden)..

        const cardFront = document.createElement('div');
        cardFront.classList.add('front');
        cardElement.appendChild(cardFront);

        // Card Back (Visible)..

        const cardBack = document.createElement('div');
        cardBack.classList.add('back');
        cardBack.textContent = image;
        cardElement.appendChild(cardBack);

        // Add event listener for clicking a card..

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
        cards.push(cardElement);

    });

    // Shuffle function..

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Flip card..

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    // Check if the two cards match..

    function checkMatch() {
        const isMatch = firstCard.dataset.image === secondCard.dataset.image;
        isMatch ? disableCards() : unflipCards();
    }

    // If cards match, keep them face-up..

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    // If cards are not matching, flip them back..

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    // Reset the board state
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Restart the game
    document.getElementById('restart').addEventListener('click', restartGame);

    function restartGame() {
        // Clear the board
        gameBoard.innerHTML = '';
        cards = [];

        // Shuffle and re-create cards
        const newShuffledImages = shuffle([...cardImages, ...cardImages]);
        newShuffledImages.forEach((image) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.image = image;

            const cardFront = document.createElement('div');
            cardFront.classList.add('front');
            cardElement.appendChild(cardFront);

            const cardBack = document.createElement('div');
            cardBack.classList.add('back');
            cardBack.textContent = image;
            cardElement.appendChild(cardBack);

            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
            cards.push(cardElement);
        });

        resetBoard();
    }
});
