/**
 * @name gameplayLoop
 * @function
 * @desc This function runs the main gameplay loop, we allow it to access and modify global game data
 */
function gameplayLoop() {
    if (g_mode == "start") {
        if (g_currentPlayer == 1) {
            startScreen(g_context, g_canvas, placeShip(g_player1arr, g_mousePos, g_currShipLength, g_currShipRotation));
            if (g_currShipLength > g_maxShips) {
                switchPlayers("start");
                g_currShipLength = 1;
            }
        }
        else if (g_currentPlayer == 2) {
            startScreen(g_context, g_canvas, placeShip(g_player2arr, g_mousePos, g_currShipLength, g_currShipRotation));
            if (g_currShipLength > g_maxShips) {
                switchPlayers("game");
            }
        }
    }
    else if (g_mode == "game" || g_mode == "switch2") {
        if (g_currentPlayer == 1) {
            renderGameplay(g_context, g_canvas, g_player1arr, g_player2arr);
        }
        else {
            renderGameplay(g_context, g_canvas, g_player2arr, g_player1arr);
        }
    }
    else if (g_mode == "win") {
        gameOver(g_context, g_canvas, g_winner);
    }
    window.requestAnimationFrame(gameplayLoop);
}

/**
 * @name switchPlayers
 * @function
 * @desc This function runs the switching screen, we allow it to access and modify global game data
 * @param {string} mode tells the function what the next mode is
 */
function switchPlayers(mode) {
    if (g_mode == "game" && mode == "game") {
        g_mode = "switch2";
    } else {
        g_mode = "switch1";
    }
    let waitToSwitch = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
    let finishSwitch = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
    waitToSwitch.then(() => {
        g_mode = "switch1";
        if (g_currentPlayer == 1) {
            switchTurn(g_context, g_canvas, 2);
            g_currentPlayer = 2;
        } else {
            switchTurn(g_context, g_canvas, 1);
            g_currentPlayer = 1;
        }
    });
    finishSwitch.then(() => {
        g_mode = mode;
    });
}

/**
 * @name fire
 * @function
 * @desc This function checks if a shot is valid
 * @param {number[]} arr the grid being fired at
 * @param {number} pos the position being fired at
 * @returns {boolean} whether the position is valid
 */
function fire(arr, pos) {
	
	//Get value stored where shot was placed
    if (arr[pos] == 1) { //only executes if un-hit ship is detected
        arr[pos] = 2;
        return true;
    } else if (arr[pos] == 0) { //executes if uninteracted cell is detected
        arr[pos] = 3;
        return true;
    }
    return false;
}


/**
 * @name placeShip
 * @function
 * @desc This function places ships
 * @param {number[]} arr the grid the ship is being placed on
 * @param {number} pos the position that a ship is being placed
 * @param {number} shipLength the length of the ship
 * @param {number} shipRotation the rotation of the ship (0=horz, 1=vert)
 * @returns {number[]} updated grid
 */
function placeShip(arr, pos, shipLength, shipRotation) {
    let newArr = [...arr]; //make copy of array instead of using original, needed due to pass by reference
    if(shipRotation == 0 && unflattenY(pos) == unflattenY(pos + shipLength - 1))
    {
        for(let i = pos; i < pos + shipLength; i++)
        {
            if (newArr[i] == 1) {
                return [...arr];
            }
            newArr[i] = 1;
        }
    }
    else if (shipRotation == 1 && (pos + (shipLength - 1)*10) <= 89) {
        for(let i = pos; i < pos + shipLength * 10; i+=10)
        {
            if (newArr[i] == 1) {
                return [...arr];
            }
            newArr[i] = 1;
        }
    }

	return newArr;
}

/**
 * @name winCheck
 * @function
 * @desc This function checks to see if the game has a winner
 * @param {number[]} arr grid to check win
 * @return {boolean} whether the game is won or not
 *
 */
function winCheck(arr) {

    //If player 1's turn, checks if any ships remaining on player 2's board
    if (!arr.includes(1))
    {
        return true;
    }
    return false;
}