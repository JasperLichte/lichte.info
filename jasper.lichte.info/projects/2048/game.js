addEventListener('load', () => {

    board = new Board();

    board.addRandomNumber();
    board.addRandomNumber();

    window.addEventListener('keydown', e => {
        if (e.key.substring(0, 5) === 'Arrow') {
            const key = e.key.split('Arrow')[1].toLowerCase();
            board.shiftBoard(key);
        }
    });
});