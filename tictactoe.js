const createGameboard = () => {
    let board = [];

    const createBoard = () => {
        board = Array(9).fill(null);
    };

    const getBoard = () => {
        return board;
    };

    return {
        createBoard,
        getBoard
    };
};

const createPlayer = (number, sign) => {
    return {
        number,
        sign
    };
};

const game = (tileId, getBoard, getCurrentPlayer) => {
    updateBoard = () => {
        const currentBoard = getBoard();
        const currentPlayer = getCurrentPlayer();

        if (currentBoard[tileId] === null){
            currentPlayer.sign = currentBoard[tileId];
        }
    }

    return {
        updateBoard
    };
}
