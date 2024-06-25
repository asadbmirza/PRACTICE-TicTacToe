function Player() {
    let name = '';
    let playerNumber = 0;

    function setName(input) {
        name = input;
    }
    function getName() {
        return name;
    }

    function setPlayerNumber(input) {
        playerNumber = input;
    }
    function getPlayerNumber() {
        return playerNumber;
    }

    function getMarker() {
        if (playerNumber == 2) {
            return "O"
        }
        return "X"
    }
    return {setName, getName, setPlayerNumber, getPlayerNumber, getMarker};
}

const game = (function gameFunctions() {
    let gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

    const playerOne = Player();
    const playerTwo = Player();

    function startRound(nameOne = playerOne.getName(), nameTwo = playerTwo.getName()) {
        playerOne.setName(nameOne);
        playerOne.setPlayerNumber(1);
        playerTwo.setName(nameTwo);
        playerTwo.setPlayerNumber(2);
        displayGame.addClicks();
    }


    function returnPlayerOne() {
        return playerOne;
    }
    function returnPlayerTwo() {
        return playerTwo;
    }

    function checkWinner(player) {
        let marker = player.getMarker();

        for (let j = 0; j < 3; j++) {
            if (gameBoard[j][0] == gameBoard[j][1] && gameBoard[j][1] == gameBoard[j][2] && gameBoard[j][2] == marker) {
                return true;
            }

            if (gameBoard[0][j] == gameBoard[1][j] && gameBoard[1][j] == gameBoard[2][j] && gameBoard[2][j] == marker) {
                return true
            }
        }
        if (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[2][2] == marker) {
            return true;
        }
        if (gameBoard[2][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[0][2] && gameBoard[0][2] == marker) {
            return true;
        }

        return false;
    }

    function updateGameBoard(array) {
        gameBoard = array.slice();
    }

    function resetBoard() {
        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    }

    function displayBoard() {
        return gameBoard;
    }

    return {checkWinner, updateGameBoard, resetBoard, displayBoard, startRound, returnPlayerOne, returnPlayerTwo}
})();



const displayGame = (function displayGame() {
    const rowOne = document.querySelectorAll(".rowOne");
    const rowTwo = document.querySelectorAll(".rowTwo");
    const rowThree = document.querySelectorAll(".rowThree");
    const gridSpaces = [rowOne, rowTwo, rowThree];
    let currentPlayer;
    let roundnumber = 1;

    const dialog = document.querySelector('dialog');
    document.addEventListener("DOMContentLoaded", () => {
        dialog.showModal();
    });
    const startGame = document.querySelector('form > button');
    startGame.addEventListener("click", (event) => {
        const inputOne = document.querySelector("#playerOne");
        const inputTwo = document.querySelector("#playerTwo");
        const spanOne = document.querySelector(".playerOne");
        const spanTwo = document.querySelector(".playerTwo");
        spanOne.textContent = inputOne.value;
        spanTwo.textContent = inputTwo.value;
        event.preventDefault();
        dialog.close();
        game.startRound(inputOne.value, inputTwo.value);
        currentPlayer = game.returnPlayerOne();
    });

    const playAgain = document.createElement("button");
    playAgain.textContent = "PLAY AGAIN";
    playAgain.addEventListener("click", element => {
        resetDisplay();
        rowTwo[1].removeChild(playAgain);
        game.startRound();
        if (currentPlayer.getPlayerNumber() == 1) {
            currentPlayer = game.returnPlayerTwo()
        }
        else {
            currentPlayer = game.returnPlayerOne();
        }
        roundnumber = 1;
    });

    function addClicks() {
        for (let i = 0; i < 3; i++) {
            gridSpaces[i].forEach(element => {
                element.addEventListener("click", displayMarker);
            });
            
        }
    }

    function displayMarker(event) {
        if (event.target.style.backgroundImage == "" && event.target != playAgain) {
            if (currentPlayer.getPlayerNumber() == 1) {
                event.target.style.backgroundImage = "url('alpha-x.svg')";
            }
            else if (currentPlayer.getPlayerNumber() == 2) {
                event.target.style.backgroundImage = "url('alpha-o.svg')";
            }
            syncBoard();
            if (game.checkWinner(currentPlayer) || roundnumber == 9) {
                displayWinner();
            }
            else if (currentPlayer.getPlayerNumber() == 1) {
                currentPlayer = game.returnPlayerTwo();
            }
            else {
                currentPlayer = game.returnPlayerOne();
            }
            roundnumber++;
        }
        
    }

    function displayWinner() {
        for (let i = 0; i < 3; i++) {
            gridSpaces[i].forEach(element => {
                element.removeEventListener("click", displayMarker);
            });
        }
        rowTwo[1].appendChild(playAgain);
        if (!game.checkWinner(currentPlayer)) {
            alert("its a tie :(");
        }
        else {
            alert(currentPlayer.getName() + " is the winner!");
        }
        
    }

    function resetDisplay() {
        for (let i = 0; i < 3; i++) {
            gridSpaces[i].forEach(element => {
                element.style.backgroundImage = "";
            });
        }
        game.resetBoard();

    }

    function syncBoard() {
        let arrayToCopy = [["", "", ""], ["", "", ""], ["", "", ""]];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j ++) {
                if (gridSpaces[j][i].style.backgroundImage == 'url("alpha-x.svg")') {
                    arrayToCopy[j][i] = "X";
                }
                else if (gridSpaces[j][i].style.backgroundImage == 'url("alpha-o.svg")') {
                    arrayToCopy[j][i] = "O";
                }
                
            }
        }
        game.updateGameBoard(arrayToCopy);
    }

    return {addClicks};
})();





