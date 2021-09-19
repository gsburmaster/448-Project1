//Main executive file for back end game logic

function gameplayLoop() {
    render(testData);
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

function fire(data, pos) {
	
	//Get value stored where shot was placed
	if (data.currentPlayer == 1) {
		let result = data.player2arr[pos];
		
		if (result == 1) { //only executes if un-hit ship is detected
            data.player2arr[pos] = 2;
		} else if (result == 0) { //executes if uninteracted cell is detected
            data.player2arr[pos] = 3;
		}
    } else {
		let result = data.player1arr[pos];
		
		if (result == 1) { //only executes if un-hit ship is detected
            data.player1arr[pos] = 2;
		} else if (result == 0) { //executes if uninteracted cell is detected
            data.player1arr[pos] = 3;
		}
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

function placeShip(data)
{
    if (data.currentPlayer == 1) {
        newShips = newShipPlacement(data.player1arr, data.mousePos, data.currShipLength, data.currShipRotation);
        if (newShips != data.player1arr) {
            data.player1arr = newShipPlacement(data.player1arr, data.mousePos, data.currShipLength, data.currShipRotation);
            data.currShipLength++;
        }
    } else {
        newShips = newShipPlacement(data.player2arr, data.mousePos, data.currShipLength, data.currShipRotation);
        if (newShips != data.player2arr) {
            data.player2arr = newShipPlacement(data.player2arr, data.mousePos, data.currShipLength, data.currShipRotation);
            data.currShipLength++;
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
function winCheck(gameData) {

    //If player 1's turn, checks if any ships remaining on player 2's board
    if (gameData.currentPlayer == 1)
    {
        for(let i = 0; i<= 89; i++)
        {
            if(gameData.player2arr[i] == 1) 
            {
                //breaks if a 1 is found, means no chance of winner
                gameData.isWon = false;
				break;
            }
            else
            {
                //sets isWon to ture and sets which player is the winner
                gameData.isWon = true;
                gameData.winner = "1"
            }
        }
    }

    //If player 2's turn, checks if any ships remaining on p1,
    else if(gameData.currentPlayer == 2)
    {
        for(let i = 0; i<=89; i++)
        {
            if(gameData.player1arr[i] == 1)
            {
				gameData.isWon = false;
                break;
            }
            else
            {
                gameData.isWon = true;
                gameData.winner = "2";
            }
        }
    }

    // calls win screen render method based on who won
    if(gameData.isWon == true)
    {
    gameOver(gameData);
    }
}