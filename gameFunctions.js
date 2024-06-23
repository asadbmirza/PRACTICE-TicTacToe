import { Player } from "./player";

export const game = (function gameFunctions() {
    const playerOne = Player();
    const playerTwo = Player();
    let gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];

    function placeMarker(player) {
        console.log(`It's Player ${player.getPlayerNumber}'s turn`);
        let positionX = prompt("Input a valid X position!");
        let positionY = prompt("Input a valid Y position!");
        while (positionX < 0 || positionX > 2 || positionY < 0 || positionY > 2 
            || gameBoard[positionY][positionX] != "") {
            positionX = prompt("Input a valid X position!");
            positionY = prompt("Input a valid Y position!");
        }

        gameBoard[positionY, positionX] = player.getMarker();
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

    function startRound() {
        playerOne.setName(prompt("Player One's name?"));
        playerTwo.setName(prompt("Player Two's name?"));

        gameBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
        console.log("Begin!");
    }

    return {placeMarker, checkWinner, startRound}
})();
