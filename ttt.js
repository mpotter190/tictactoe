//set up game board
const gameBoard = (function(){
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        let boardHTML = "";
        gameBoard.forEach((cell, index) => {
            boardHTML += `<div class="cell" id=cell-${index}">${cell}</div>`
        })
    }
    document.querySelector("#board").innerHTML = boardHTML;
    return {
        render,
    }
})()

const createPlayer = (name, marker) => {
    return {
        name,
        marker
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
    }
})

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
    //Game.start();
});

//set up game board
let gameBoardModule = (function(){
    let gameBoard = ["X"];
    return{gameBoard};
})();

let displayControllerModule = (function(){
    let testF = () =>   {console.log("hello world")};
    return {testF};
})();

//TODO: intialize players and board
//TODO: make win conditions
//TODO: make the game pass turns and declare a tie
//TODO: limit global code as much as possible
