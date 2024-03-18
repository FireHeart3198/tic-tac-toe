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
        display.loadBoard();
        activePlayer = player1;
        round = 1;
    };
    const nextTurn = function() {
        if (win.getWinCondition(activePlayer)) {
            win.getWinMessage(activePlayer);
        } else if (round === 9) {
            win.getTieMessage();
        } else {activePlayer = (activePlayer === player1) ? player2 : player1;
            alert(`It's ${activePlayer.playerName}'s turn`);
        }
    };
    const makePlayerMove = function(selectedSquare) {
        if (!win.getWinCondition(activePlayer)) {
            if (gameBoard.getSquareStatus(selectedSquare) === null) {
                gameBoard.updateSquare(selectedSquare, activePlayer.playerMark);
                return true;
            }
        }
    };

    return { startGame, nextTurn, makePlayerMove };
})();


const win = (function() {
    const getWinMessage = function (activePlayerInfo) {
        alert(`${activePlayerInfo.playerName} has won!`);
        };
    const getTieMessage = function () {
        alert("It's a tie...");
    };

    const getWinCondition = function (activePlayerInfo) {
        const activePlayerMark = activePlayerInfo.playerMark;
        const wins = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]];
        for (let i = 0; i < wins.length; i++) {
            let numberOfIdenticalMarks = 0;
            for (let j = 0; j < 3; j++) {
                if (gameBoard.getSquareStatus(wins[i][j]) === activePlayerMark) {
                    numberOfIdenticalMarks++;
                }
            }
            if (numberOfIdenticalMarks === 3) {
                return true;
            }
        }
        return false;
    };

    return { getWinMessage, getTieMessage, getWinCondition };
    })();


const display = (function() {
    const boardSquares = document.querySelectorAll(".square");
    const startButton = document.querySelector(".start-button");

    function chooseSquare(e) {
        let selectedSquare = e.target.getAttribute('data-square-number');
        if(gamePlay.makePlayerMove(selectedSquare)) {
            e.target.textContent = gameBoard.getSquareStatus(selectedSquare);
            gamePlay.nextTurn();
        }
    }
    const loadBoard = function() {
        for (let i = 0; i < boardSquares.length; i++) {
            boardSquares[i].textContent = "";
            boardSquares[i].addEventListener('click', chooseSquare);
        }
    };
    const start = function() {
        startButton.addEventListener('click', gamePlay.startGame);
    }

    return { loadBoard, start };
})();

display.start();