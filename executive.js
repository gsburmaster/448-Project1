//Main executive file for back end game logic

//Basic game data
//Note other 2 arrays for tracking hits and misses havent been added
//Planned on 1 meaning ship is at spot, 2 is hit
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