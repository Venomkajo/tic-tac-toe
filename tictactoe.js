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

    const checkBoard = () => {
        const possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const currentBoard = gameboard.getBoard();
        let count = 0;

        for (let i = 0; i < possibilities.length; i++){
            count = 0;
            for (let j = 0; j < possibilities[i].length; j++){
                if (currentBoard[possibilities[i][j]] === player1.sign){
                    count++;
                }
            }
            if (count === 3){
                return "player1";
            }
            count = 0;

            for (let j = 0; j < possibilities[i].length; j++){
                if (currentBoard[possibilities[i][j]] === player2.sign){
                    count++;
                }
            }
            if (count === 3){
                return "player2";
            }
            count = 0;
        }

        return false;
    }

    return{
        getCurrentPlayer,
        changeBoard,
        checkBoard
    };
}

var currentGame = game();
var gameTiles = document.querySelectorAll('.game-tile');

gameTiles.forEach(tile => {
    tile.addEventListener('click', function(){
        console.log('pressed ' + tile.dataset.number);

        if (currentGame.changeBoard(tile.dataset.number)){
            tile.innerText = currentGame.getCurrentPlayer().sign;
            console.log(currentGame.checkBoard());
        }
    })
})