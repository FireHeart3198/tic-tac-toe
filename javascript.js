const gameBoard = (function() {
    const gameSquares = [];
    
    const createGameSquares = function() {
        gameSquares.splice(0,gameSquares.length);
        for (let i = 1; i <= 9; i++) {
            let square = {squareNum: i, status: null,};
            gameSquares.push(square);
        }
    }
    const updateSquare = function (squareNum, updatedStatus) {
        gameSquares[squareNum - 1].status = updatedStatus;
    }
    const getSquareStatus = (squareNum) => gameSquares[squareNum - 1].status;

    return { updateSquare, getSquareStatus, createGameSquares };
})();


function player(playerName, playerMark) {
    const playerInfo = {
        playerName,
        playerMark,
    };

    const getPlayerInfo = () => playerInfo;

    return { getPlayerInfo };
}


const gamePlay = (function() {
    let player1;
    let player2;
    let activePlayer;
    let round;

    const startGame = function() {
        gameBoard.createGameSquares();
        player1 = player(prompt("What's your name Player 1?", "Tic"), "X")
        player2 = player(prompt("What's your name Player 2?", "Tac"), "O")
        round = 1
        do {
            activePlayer = (rounds % 2 === 0) ? player2 : player1;
            alert(`It's ${activePlayer.getPlayerInfo().playerName}'s turn`)
            turn.makePlayerMove(activePlayer.getPlayerInfo());
            round++;
        } while (/*!(getWinningCondition()) ||*/ round <= 9);
        /* getWinningMessage();*/
    }

    return { startGame };
})();


const turn = (function() {
    let selectedSquare;

    const chooseSquare = function() {
        selectedSquare = prompt("Which square (from 1-9) do you choose?")
    }
    const makePlayerMove = function(activePlayerInfo) {
        let tries = 0
        do {
            chooseSquare();
            if (gameBoard.getSquareStatus(selectedSquare) === null) {
                gameBoard.updateSquare(selectedSquare, activePlayerInfo.playerMark);
                break
            }
            alert("Please choose a free square")
            tries++
        } while (tries < 3);
        
    }

    return { makePlayerMove };
})();


gamePlay.startGame();
// gameBoard.createGameSquares()
// console.log(gameBoard.gameSquares)
// console.log(gameBoard.getSquareStatus(1))