//1)  Set up players
//2) Set up game board tiles as 2D array
//3) Setup game board


// GLOBALS
var gameSettings = {
    numberOfPlayers: 2,
    nullTileColor: "aquamarine",
    currentPlayer: 0, // 0 = Uninitialized | 1 = Player 1 | 2 = Player 2
    playStatus: false,
    lastSelection: null,
    moveOptions: [],

    listSettings: function () {
        console.log('currentPlayer: ' + this.currentPlayer + '\n' +
            'playStatus: ' + this.playStatus + '\n' +
            'lastSelection: ' + this.lastSelection + '\n' +
            'moveOptions: ' + this.moveOptions);
    }
}

var player1 = {
    color: "#0000ff", // Player 1 is Blue
    startingPositions: [
        "00",
        "77"
    ]
}
console.log('1a) Player 1 initialized');

var player2 = {
    color: "#ffff00", // Player 2 is Yellow
    startingPositions: [
        "07",
        "70"
    ]
}
console.log('1b) Player 2 initialized');


//2) Set up game board tiles as 2D array
//   Tile Values:
//    0 = Blank
//    1 = Player 1
//    2 = Player 2
var tileArray = new Array(7);

for (var column = 0; column <= 7; column++) {
    tileArray[column] = new Array();

    for (var row = 0; row <= 7; row++) {
        tileArray[column][row] = 0;
    }
}

console.log('2) Game board array populated');


//3) Setup game board
setupGameBoard(player1, 1);
setupGameBoard(player2, 2);

function setupGameBoard(playerNumber, playerCode) {
    for (i = 0; i < playerNumber.startingPositions.length; i++) {
        var col = playerNumber.startingPositions[i].substr(0, 1);
        var row = playerNumber.startingPositions[i].substr(1, 1);

        tileArray[col][row] = playerCode;
    }
}

console.log('3) Game board initialized')


//4) Update game board
updateGameBoard();
gameSettings.currentPlayer = parseInt(1);

function updateGameBoard() {
    // Read through current state of tileArray and 
    //   update the game board accordingly
    for (column = 0; column <= 7; column++) {
        for (row = 0; row <= 7; row++) {
            if (tileArray[column][row] == 0) {
                document.getElementById("tile" + [column] + [row]).style.backgroundColor = gameSettings.nullTileColor;
            }
            else if (tileArray[column][row] == 1) {
                document.getElementById("tile" + [column] + [row]).style.backgroundColor = player1.color;
            }
            else if (tileArray[column][row] == 2) {
                document.getElementById("tile" + [column] + [row]).style.backgroundColor = player2.color;
            }
        }
    }
}

console.log('4) Game board refreshed');



printGameBoardArray(); // Debug:






function call(cell_id) {
    // Identify tile coordinates
    var column = cell_id.substr(4, 1);
    var row = cell_id.substr(5, 1);


    if (gameSettings.playStatus == false) { // Make a selection

        if (checkSelectionStatus(column, row) > 0) {
            gameSettings.playStatus = true;
            gameSettings.lastSelection = column + ',' + row;

            console.log(column + ',' + row + 'is playable by Player ' +
                gameSettings.currentPlayer + '. Make a play. \n' +
                'playStatus: ' + gameSettings.playStatus + '\n' +
                'lastSelection: ' + gameSettings.lastSelection);
        } else {
            gameSettings.lastSelection = null;
            console.log('blank tile \n' +
                'playStatus: ' + gameSettings.playStatus + '\n' +
                'lastSelection: ' + gameSettings.lastSelection);
        }

    } else { // Attempt to make a play

        if (gameSettings.lastSelection == column + ',' + row) { // Choose previous tile to undo play attempt
            gameSettings.playStatus = false;
            gameSettings.lastSelection = null;
            console.log('unselected');

        } else { // Make a play
            calculateMoveOptions(column, row);
            console.log('made a play');
            gameSettings.playStatus = false;
            
        }
    }


}

function calculateMoveOptions(inputColumn, inputRow) {
    gameSettings.moveOptions = []; // Clear move options

    for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; i++) {
            if (inputColumn + i >= 0 && inputColumn + i <= 7 &&
                inputRow + j >= 0 && inputRow + j <= 7) {

                if (i != inputColumn && j != inputRow) {
                    // Add option to array
                    gameSettings.moveOptions.push(inputColumn + ',' + inputRow);
                }

            }
        }
    }
    gameSettings.listSettings();
}



function checkSelectionStatus(column, row) {
    if (tileArray[column][row] == 1) {
        document.getElementById("txtDebug").value = 'Player 1 can move from ' + column + ',' + row;
        return 1;
    } else if (tileArray[column][row] == 2) {
        document.getElementById("txtDebug").value = 'Player 2 can move from ' + column + ',' + row;
        return 2;
    } else {
        document.getElementById("txtDebug").value = column + ',' + row + ' is a blank tile.';
        return false;
    }
}


// Debug:
function printGameBoardArray() {
    console.log('        Column #: 0,1,2,3,4,5,6,7'); // Print header Row
    for (var i = 0; i <= 7; i++) {
        console.log('    tileArray[' + i + ']: ' + tileArray[i]); // Print all rows
    }

    console.log(''); // Print blank line after array
}