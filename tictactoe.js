const createGameboard = () => {
    let board = Array(9).fill(null);

    const getBoard = () => {
            return board;
    };

    const updateBoard = (index, sign) => {
        if (board[index] === null){
            board[index] = sign;
            return true;
        } else {
            return false;
        }
    }

    return {
        updateBoard,
        getBoard
    };
};

const getPlayer = (number, sign, turn) => {
    return {
        number,
        sign,
        turn
    };
};

const game = () => {
    const player1 = getPlayer(1, 'X', true);
    const player2 = getPlayer(2, 'O', false);
    const gameboard = createGameboard();

    const getCurrentPlayer = () =>{
        return player1.turn ? player1 : player2;
    }

    const changeBoard = (tileId) =>{
        const currentPlayer = getCurrentPlayer();
        if (gameboard.updateBoard(tileId, currentPlayer.sign)){
            player1.turn = !player1.turn;
            player2.turn = !player2.turn;

            return true;
        } else {
            return false;
        }
    }

    return{
        getCurrentPlayer,
        changeBoard
    };
}

var currentGame = game();
var gameTiles = document.querySelectorAll('.game-tile');

gameTiles.forEach(tile => {
    tile.addEventListener('click', function(){
        console.log('pressed ' + tile.dataset.number);

        if (currentGame.changeBoard(tile.dataset.number)){
            tile.innerText = currentGame.getCurrentPlayer().sign;
        }
    })
})