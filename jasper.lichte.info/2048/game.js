addEventListener('load', () => {

    board = new Board();

    board.addRandomNumber();
    board.addRandomNumber();

    window.addEventListener('keydown', e => {
        const key = e.key.split('Arrow')[1].toLowerCase();
        board.shiftBoard(key);
    });
});