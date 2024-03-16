const gameBoard = (function() {
    const gameSquares = []
    
    // create game squares at game start so don't have to reset to null at end
    const createGameSquares = function() {
        gameSquares.splice(0,gameSquares.length)
        for (let i = 1; i <= 9; i++) {
            let square = {squareNum: i, status: null,}
            gameSquares.push(square)
        }
        console.log(gameSquares)
    }
    const updateSquare = function (squareNum, updatedStatus) {
        gameSquares[squareNum - 1].status = updatedStatus;}
    const getSquareStatus = (squareNum) => gameSquares[squareNum - 1].status

    return { updateSquare, getSquareStatus, createGameSquares}
})();