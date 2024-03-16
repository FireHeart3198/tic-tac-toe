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
    let player1
    let player2
    let activePlayer
    let rounds

    const startGame = function() {
        player1 = player(prompt("What's your name Player 1?", "Tic"), "X")
        player2 = player(prompt("What's your name Player 2?", "Tac"), "O")
        rounds = 1
        do {
            activePlayer = (rounds % 2 === 0) ? player2 : player1;
            /* turn.makePlayerMove(activePlayer.getPlayerInfo())*/
            rounds++;
        } while (/*!(getWinningCondition()) ||*/ rounds <= 9);
            // check if last round is needed when assuming tie
        /* getWinningMessage();*/
    }
    /* const getActivePlayer = () => activePlayer.getPlayerInfo(); */
    // not sure need ^ as can just send active player info in startGame, check later

    return { startGame, /*getActivePlayer*/ }
})();

gamePlay.startGame()