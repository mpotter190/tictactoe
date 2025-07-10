//creates end game message
const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    
    return {
        renderMessage
    }
})();



//set up game board
const gameBoard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((cell, index) => {
            boardHTML += `<div class="cell" id="cell-${index}">${cell}</div>`
        })
        document.querySelector("#board").innerHTML = boardHTML;

        //keeps event listener on cells
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
    }
})();

//factory to create players
const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
}

//sets up and starts game, assigns markers to players
const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.render();
    }

    const handleClick = (event)  => {
        if (gameOver){
            return;
        }

        let index = parseInt(event.target.id.split("-")[1]);

        //stops from changing a cell once chosen
        if (gameBoard.getGameboard()[index] !== "")
            return;

        gameBoard.update(index, players[currentPlayerIndex].marker);

        if (checkWin(gameBoard.getGameboard(), players[currentPlayerIndex].marker)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} won!`);
        }
        else if (checkTie(gameBoard.getGameboard())){
            gameOver = true;
            displayController.renderMessage(`It's a tie!`);
        }
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    //restarts game but is redundant because start button can do the same thing
    const restart = () => {
        for (let i=0; i < 9; i++) {
            gameBoard.update(i, "");
        }
        //remember to capitalize HTML always!!!
        document.querySelector("#message").innerHTML = "";
        gameOver = false;
        gameBoard.render();
    }

    function checkWin(board) {
        const winCombos = [
          [0,1,2], [3,4,5], [6,7,8], // rows
          [0,3,6], [1,4,7], [2,5,8], // columns
          [0,4,8], [2,4,6]           // diagonals
        ];

        for (let i=0; i < winCombos.length; i++){
            const [a, b, c] = winCombos[i];
            if (board[a] && board[a]===board[b] && board[a]===board[c]){
                return true
            }
        }
        return false
    }

    function checkTie(board) {
        return board.every(cell => cell !== "")
    }


    return {
        start,
        restart,
        handleClick,
        checkWin
    }
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    Game.start();
})

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
})
