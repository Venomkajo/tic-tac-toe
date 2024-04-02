const createGameboard = () => {
    const board = [];

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
