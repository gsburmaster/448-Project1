//Main executive file for back end game logic

function gameplayLoop() {
    render();
    if (mode == "start") {
        if (currentPlayer == 1 && currShipLength > maxShips) {
            currentPlayer = 2;
            currShipLength = 1;
        }
        else if (currentPlayer == 2 && currShipLength > maxShips) {
            currentPlayer = 1;
            mode = "game";
        }
    }
    window.requestAnimationFrame(gameplayLoop);
	
    /*let pos = 0;
	while (gameData.isWon == false) {
		if (gameData.currentPlayer == 1) {
			//get fire information and store it in pos
			switch (fire(gameData, pos)) {
				// copy/paste code below
				case 0: //miss 
				
				break;
				case 1: //hit
				
				break;
				case 2: //sunk
				
				break;
				default:
				console.log("Something went real wrong.\n");
			}
		} else {
			//get fire information and store it in pos
			switch (fire(gameData, pos)) {
				case 0: //miss 
				
				break;
				case 1: //hit
				
				break;
				case 2: //sunk
				
				break;
				default:
				console.log("Something went real wrong.\n");
			}
		}
		winCheck(gameData);
		
		//Switch current player
		gameData.currentPlayer = (gameData.currentPlayer + 1)%2;
	}*/
	
	//Victory screen - can also just leave empty if we want to add that code to whatever section calls the gameplayLoop function
}

function fire(pos) {
	
	//Get value stored where shot was placed
	if (currentPlayer == 1) {
		if (player2arr[pos] == 1) { //only executes if un-hit ship is detected
            player2arr[pos] = 2;
            winCheck();
		} else if (player2arr[pos] == 0) { //executes if uninteracted cell is detected
            player2arr[pos] = 3;
		}
        currentPlayer = 2;
    } else {
		if (player1arr[pos] == 1) { //only executes if un-hit ship is detected
            player1arr[pos] = 2;
            winCheck();
		} else if (player1arr[pos] == 0) { //executes if uninteracted cell is detected
            player1arr[pos] = 3;
		}
        currentPlayer = 1;
	}
}


/**
 * Place Ship method
 * @param {*} arr 
 * @param {*} pos 
 * @param {*} shipLength 
 * @param {*} shipRotation 
 * @returns updated arr
 */
function newShipPlacement(arr, pos, shipLength, shipRotation) {
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

function placeShip()
{
    if (currentPlayer == 1) {
        newShips = newShipPlacement(player1arr, mousePos, currShipLength, currShipRotation);
        if (!newShips.every((el, ix) => el === player1arr[ix])) {
            player1arr = newShipPlacement(player1arr, mousePos, currShipLength, currShipRotation);
            currShipLength++;
        }
    } else {
        newShips = newShipPlacement(player2arr, mousePos, currShipLength, currShipRotation);
        if (!newShips.every((el, ix) => el === player2arr[ix])) {
            player2arr = newShipPlacement(player2arr, mousePos, currShipLength, currShipRotation);
            currShipLength++;
        }
    }
}


/**
*This function checks to see if the game has a winner
* @param {object} takes gameData object as argument
* @return none
* 
*
*/
function winCheck() {

    //If player 1's turn, checks if any ships remaining on player 2's board
    if (currentPlayer == 1 && !player2arr.includes(1))
    {
        winner = 1;
        mode = "win";
    }

    //If player 2's turn, checks if any ships remaining on p1,
    else if(currentPlayer == 2 && !player1arr.includes(1))
    {
        winner = 2;
        mode = "win";
    }
}