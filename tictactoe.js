function Player() {
    let name = '';
    let playerNumber = 0;
    let positionX;
    let positionY;

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

    function placeMarker(player) {
        console.log(`It's Player ${player.getPlayerNumber()}'s turn`);
        let positionX = prompt("Input a valid X position!");
        let positionY = prompt("Input a valid Y position!");
        while (positionX < 0 || positionX > 2 || positionY < 0 || positionY > 2 
            || gameBoard[positionY][positionX] != "") {
            positionX = prompt("Input a valid X position!");
            positionY = prompt("Input a valid Y position!");
        }

        gameBoard[positionY][positionX] = player.getMarker();
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

    function resetBoard() {
        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    }

    function displayBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(gameBoard[i][0] + " " + gameBoard[i][1] + " " + gameBoard[i][2]);
        }
        
    }

    return {placeMarker, checkWinner, resetBoard, displayBoard}
})();

const play = (function playGame() {
    const playerOne = Player();
    const playerTwo = Player();
    let roundNumber = 1;

    function startRound() {
        playerOne.setName(prompt("Player One's name?"));
        playerOne.setPlayerNumber(1);
        playerTwo.setName(prompt("Player Two's name?"));
        playerTwo.setPlayerNumber(2);
        playRound();
        let playAgain = prompt("Play again? y/n");
        while (playAgain == "y") {
            playRound();
            playAgain = prompt("Play again? y/n");
        }
    }

    function playRound() {
        roundNumber = 1;
        game.resetBoard();
        console.log("Begin!");
        let currentPlayer = playerTwo;

        while(!game.checkWinner(currentPlayer) || roundNumber == 10) {
            if (currentPlayer.getPlayerNumber() == 2) {
                currentPlayer = playerOne;
            }
            else {
                currentPlayer = playerTwo;
            }
            game.displayBoard();
            game.placeMarker(currentPlayer);
            roundNumber++;
        }

        if (roundNumber == 10) {
            console.log("It's a tie!");
        }
        else {
            console.log(`${currentPlayer.getName()} is the winner!`);
        }
    }

    return {startRound};
})();

play.startRound();