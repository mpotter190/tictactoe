//set up game board
let gameBoardModule = (function(){
    let gameBoard = [];
    return{};
})();

let displayControllerModule = (function(){
    let testF = () =>   {console.log("hello world")};
    return {testF};
})();

let createPlayer = (name, number, marker) => {
    let getPlayerName = () => { name;
        console.log("this is the name of player " + number + "......" + name);}
    return {getPlayerName, name, number, marker};
};
//TODO: intialize players and board
//TODO: make win conditions
//TODO: make the game pass turns and declare a tie
//TODO: limit global code as much as possible
