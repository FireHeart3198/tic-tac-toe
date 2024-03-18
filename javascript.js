const gameBoard = (function() {
    const gameSquares = [];
    
    const createGameSquares = function() {
        gameSquares.splice(0,gameSquares.length);
        for (let i = 1; i <= 9; i++) {
            let square = {squareNum: i, status: null,};
            gameSquares.push(square);
        }
    };
    const updateSquare = function (squareNum, updatedStatus) {
        gameSquares[squareNum - 1].status = updatedStatus;
    };
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
        player1 = player(prompt("What's your name Player 1?", "Tic"), "X").getPlayerInfo();
        player2 = player(prompt("What's your name Player 2?", "Tac"), "O").getPlayerInfo();
        round = 1;
        do {
            activePlayer = (round % 2 === 0) ? player2 : player1;
            alert(`It's ${activePlayer.playerName}'s turn`);
            turn.makePlayerMove(activePlayer);
            round++;
        } while (!(win.getWinCondition(activePlayer)) && round <= 9);
        win.getWinMessage(activePlayer);
    }

    return { startGame };
})();


const turn = (function() {
    let selectedSquare;

    const chooseSquare = function() {
        selectedSquare = prompt("Which square (from 1-9) do you choose?");
    }
    const makePlayerMove = function(activePlayerInfo) {
        let tries = 0;
        do {
            chooseSquare();
            if (gameBoard.getSquareStatus(selectedSquare) === null) {
                gameBoard.updateSquare(selectedSquare, activePlayerInfo.playerMark);
                break;
            }
            alert("Please choose a free square");
            tries++;
        } while (tries < 3);
        
    }
    const getSelectedSquare = () => selectedSquare;

    return { makePlayerMove, getSelectedSquare };
})();


const win = (function() {
    let winCondition = false;

    const getWinMessage = function (activePlayerInfo) {
        if (winCondition === false) {
            alert("It's a tie...");
            winCondition = false;
        }
        else {
            alert(`${activePlayerInfo.playerName} has won!`);
            winCondition = false;
        }
    }
    const getWinCondition = function (activePlayerInfo) {
        const activePlayerMark = activePlayerInfo.playerMark;
        const wins = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]];
        for (let i = 0; i < wins.length; i++) {
            let numberOfIdenticalMarks = 0;
            for (let j = 0; j < 3; j++) {
                if (
                    gameBoard.getSquareStatus(wins[i][j]) === activePlayerMark) {
                    numberOfIdenticalMarks++;
                }
            }
            if (numberOfIdenticalMarks === 3) {
                return winCondition = true;
            }
        }
        return winCondition;
    }

    return { getWinMessage, getWinCondition };
    })();

gamePlay.startGame();
while (prompt("Play again?", "yes") === "yes") {
    gamePlay.startGame();
}