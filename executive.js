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

function fire(gameData, pos) {
	
	//Get value stored where shot was placed
	if (gameData.currentPlayer == 1) {
		let result = gameData.player2arr[pos];
		
		if (result == 1) { //only executes if un-hit ship is detected
		gameData.player2arr[pos] = 2;
		return(1);
		} else if (result == 0) { //executes if uninteracted cell is detected
		gameData.player2arr[pos] = 3;
		}
		
	} else {
		let result = gameData.player1arr[pos];
		
		if (result == 1) { //only executes if un-hit ship is detected
		gameData.player1arr[pos] = 2;
		return(1);
		} else if (result == 0) { //executes if uninteracted cell is detected
		gameData.player1arr[pos] = 3;
		}
	}
	
	return(0);		
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