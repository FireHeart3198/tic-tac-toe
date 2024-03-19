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


function player(playerName, playerMark, playerNumber) {
    const playerInfo = {
        playerName,
        playerMark,
        playerNumber,
    };

    const getPlayerInfo = () => playerInfo;

    return { getPlayerInfo };
}


const gamePlay = (function() {
    let player1;
    let player2;
    let activePlayer;
    let round;

    const startGame = function(player1Name, player2Name) {
        gameBoard.createGameSquares();
        player1 = player(player1Name, "X", "one").getPlayerInfo();
        player2 = player(player2Name, "O", "two").getPlayerInfo();
        display.loadBoard();
        activePlayer = player1;
        round = 1;
    };
    const nextTurn = function() {
        if (win.getWinCondition(activePlayer)) {
            display.removePlayerDisplay();
            win.getWinMessage(activePlayer);
        } else if (round === 9) {
            display.removePlayerDisplay();
            win.getTieMessage();
        } else {
            activePlayer = (activePlayer === player1) ? player2 : player1;
            display.updatePlayerDisplays(activePlayer.playerNumber);
            round++;
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
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const confirmButton = document.querySelector(".confirm");
    const player1Display = document.querySelector(".player.one");
    const player2Display = document.querySelector(".player.two");
    const player1Name = document.querySelector(".player.one .name");
    const player2Name = document.querySelector(".player.two .name");

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
        form.addEventListener("formdata", formHandler);
        confirmButton.addEventListener('click', confirmHandler);
        startButton.addEventListener('click', () => {
            dialog.showModal();
        });
    };
    function formHandler(e) {
        const names = e.formData;
        let player1 = names.get("player-1");
        let player2 = names.get("player-2");
        player1Name.textContent = player1;
        player2Name.textContent = player2;
        player1Display.classList.add("current")
        gamePlay.startGame(player1, player2);
    }
    function confirmHandler(e) {
        e.preventDefault();
        new FormData(form);
        dialog.close();
    }
    const updatePlayerDisplays = function(activePlayer) {
        const newPlayer = (activePlayer === 'one') ? player1Display : player2Display;
        const pastPlayer = (newPlayer === player1Display) ? player2Display : player1Display;
        pastPlayer.classList.remove("current");
        newPlayer.classList.add("current");
    }
    const removePlayerDisplay = function() {
        player1Display.classList.remove("current");
        player2Display.classList.remove("current");
    }

    return { loadBoard, start, updatePlayerDisplays, removePlayerDisplay };
})();

display.start();