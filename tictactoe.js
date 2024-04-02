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

    const resetBoard = () => {
        board = Array(9).fill(null);
    }

    return {
        updateBoard,
        getBoard,
        resetBoard
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

    const resetGame = () => {
        player1.turn = true;
        player2.turn = false;
        gameboard.resetBoard();
    }

    return{
        getCurrentPlayer,
        changeBoard,
        checkBoard,
        resetGame
    };
}

var currentGame = game();
var wonGame = false;
const gameTiles = document.querySelectorAll('.game-tile');
const resultText = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function(){
    currentGame.resetGame();
    wonGame = false;
    gameTiles.forEach(tile => {
        tile.innerText = null;
        tile.style.backgroundColor = 'yellowgreen';
    })
    resultText.innerText = 'The game is on!';
});

gameTiles.forEach(tile => {
    tile.addEventListener('click', function(){
        if (wonGame === false){
            console.log('pressed ' + tile.dataset.number);
            
            if (currentGame.changeBoard(tile.dataset.number)){
                tile.innerText = currentGame.getCurrentPlayer().sign;
                if (currentGame.checkBoard()){
                    gameTiles.forEach(tile => {
                        wonGame = true;
                        tile.style.backgroundColor = 'green';
                    })
                    resultText.innerText = 'Game over!';
                }
            }
        }
    })
})