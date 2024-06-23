export function Player() {
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