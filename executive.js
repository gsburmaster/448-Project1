//Main executive file for back end game logic

//Basic game data
//Note other 2 arrays for tracking hits and misses havent been added
//Planned on 0 = empty, 1 = ship placed (un-hit), 2 = missed shot, 3 = hit ship, 4 = sunk ship
//EX: [0,0,1,1,2,1,0]
let gameData = {

    currentPlayer: 1,
    shipNumber,
  /*char*/  winner: "1",
    gameStart: false,
    isWon: false,
    player1arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

}

function gameplayLoop(gameData) {
	let pos = 0;
	while (gameData.isWon == false) {
		if (gameData.currentPlayer == 1) {
			//get fire information and store it in pos
			switch (fire(gameData, pos) {
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
			switch (fire(gameData, pos) {
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
	}
}

function fire(gameData, pos) {
	
	//Get value stored where shot was placed
	if (gameData.currentPlayer == 1) {
		let result = gameData.player1arr[pos];
	} else {
		let result = gameData.player2arr[pos];
	}
	
	if (result == 1) { //only executes if un-hit ship is detected
		gameData.player1arr[pos] = 3
		//if ship is sunk, set gameData.player1arr[pos] = 4 and return 2
		return(1);
	}
	return(0);		
}


/**
*This function checks to see if the game has one
* @param {object} takes gameData object as argument
*
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