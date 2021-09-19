/*    NOTES FOR WHOEVER ENDS UP WITH MY LOOSE ENDS:

I am sorry that I didn't get as much done as discussed. I had to do a pretty significant refactor to pass the grids as objects (which makes eventlisteners more mobile and made rendering ships pretty easy.)
Event Listeners for buttons are not coded (I think you wanted to do it separately Logan?)
render needs to be handed blank data in the DOMCONTENTLOADED eventlistener. It isn't right now.
for the potential move, there is a method in here for clearing potential move, rendering potential move , a var called potMove, and a method for turning a 1d array index into the 2d corresponding coordinate (E4 or J9).
that stuff should have to happen in the event listener
startScreen is unfinished, as I didn't even get close to rotate. 
the Fire eventlistener needs to be the thing to call switchTurn and update data and such (imo)
If you have any questions, have dom text me. I won't be looking at discord, but if its urgent I can try to help

-Gage

*/

//adapted from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images



//Images used in gameplay as either buttons or just visuals. All images contained in Image folder in main.
let img_gameLogo = new Image();
img_gameLogo.src = 'Images/battleship.png';
let logowidth = 107;
let logoheight = 23;

let img_startButton = new Image();
img_startButton.src = 'Images/start.png';
let startwidth = 71;
let startheight = 22;

let img_p1Win = new Image();
img_p1Win.src = 'Images/player1.png';
let p1width = 89;
let p1height = 59;

let img_p2Win = new Image();
img_p2Win.src = 'Images/player2.png';
let p2width = 89;
let p2height = 59;

let img_submit = new Image();
img_submit.src = 'Images/submit.png';
let submitwidth = 81;
let submitheight = 21;

let img_fire = new Image();
img_fire.src = 'Images/fire.png';
let firewidth = 50;
let fireheight = 20;

let img_enemysea = new Image();
img_enemysea.src = 'Images/enemysea.png';
let eseawidth = 125;
let eseaheight = 23;

let img_mysea = new Image();
img_mysea.src = 'Images/mysea.png';
let mseawidth = 82;
let mseaheight = 23;

let img_rotate = new Image();
img_rotate.src = 'Images/rotate.png';
let rotatewidth = 83;
let rotateheight = 19;

let img_startScreen = new Image();
img_startScreen.src = 'Images/img_startScreen.png';

/**
 * @description Main render function that calls the smaller gameplay render functions, unused
 * @see {@link gameplayLoop}
 * @return None
 */
function render() {
    clearScreen();
    if (mode == "start")
    {
        startScreen();
    }
    else if (mode == "game")
    {
        gameplay();
    }
    else if (mode == "win")
    {
        gameOver();
    }
}

/**
 * @description Start screen render function
 * @param {Object} context - global context variable for drawing
 * @param {Object} canvas - global canvas variable
 */
function renderStartScreen(context, canvas) {
    context.drawImage(img_startScreen, 0, 0);
}

/**
 * @description Gameplay render function, creates 2 grids, one for your ships, one for tracking hits and misses on enemy ships. Handles global variable potMove, which shows what move is queued up (currently unused functionality)
 * @param {Object} context - global context variable for drawing
 * @param {Object} canvas - canvas variable
 * @param {number[]} leftShips - variable for ships on left grid
 * @param {number[]} rightShips - varibale for ships on right grid
 */

//this is the gameplay render function. it is the both grids showing,"fire" screen. 
//it takes in player1, player2, and data 
//also handles global potMove, which lets me update what move is queued up
function renderGameplay(context, canvas, leftShips, rightShips) {
    clearScreen(context);
   
   //DRAWS a line in the middle of the screen
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();


    context.drawImage(img_gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    context.drawImage(img_mysea,canvas.width/4 - mseawidth*3/2,canvas.height/6 - mseaheight*1.75,mseawidth*3,mseaheight*3);
    context.drawImage(img_enemysea,canvas.width -canvas.width/4 - eseawidth*3/2,canvas.height/6 - eseaheight*1.75,eseawidth*3,eseaheight*3);
    //context.drawImage(img_fire,canvas.width*3/4-firewidth*3/2,canvas.height-canvas.height/6,firewidth*3,fireheight*3);

    renderShips(context, leftShips, leftGrid, true);
    renderShips(context, rightShips, rightGrid, false);

    //showPotMove();
}

/**
 * @description called everytime potMove variable is updated from event listener
 */
function showPotMove()
{
        context.font = "40px Impact";
        context.fillStyle = "#04084b"; //color of navy in mysea.png. could update to fix colors later
        context.fillText("Potential move: " + potMove,canvas.width/4 - (context.measureText("Potential move: " + potMove).width / 2),canvas.height-canvas.height/8 );
}


/**
 * @description clears the bottom fifth of the left half of the gameplay screen so that the potential move can be reupdated with new potential moves upon a new click. call this before showPotMove();
 */

function clearPotMove()
{
    context.clearRect(0,canvas.height - canvas.height/5, canvas.width/2 - 1,canvas.height);
}


/**
 * @description clears screen
 * @param {Object} context - global context variable for drawing
 */
function clearScreen(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}



//based on who's turn it is and how many ships there are, places ships and such. THIS IS UNFINISHED.
function renderPlacementScreen(context, canvas, arr) {
    clearScreen(context);
    context.drawImage(img_gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    //context.drawImage(img_rotate, canvas.width - (canvas.width / 4) - (.5 * rotatewidth), canvas.height/2 - rotateheight/2, rotatewidth , rotateheight );
    //context.drawImage(img_submit, canvas.width/2  -submitwidth, canvas.height - canvas.height/8 - submitheight/2, submitwidth *2, submitheight *2);
    renderShips(context, arr, centerGrid, true);
}



/**
 * @description Changes current player variable and puts up a splash screen to hide ships and allow players to change turns
 * @param {Object} context - global context variable for drawing
 * @param {Object} canvas - canvas variable
 * @param {number} nextPlayer - variable to hold which player has the next turn
 */

//portions adapted from //https://github.com/gsburmaster/Connect4/blob/main/connect-four.js
// and https://www.w3schools.com/tags/canvas_measuretext.asp
function switchTurn(context, canvas, nextPlayer) {
    clearScreen(context);
    context.fillStyle = "Black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Impact";
    context.fillStyle = "#feebeb";
    context.fillText("Player " + nextPlayer + " turn in", (canvas.width / 2) - (context.measureText("Player " + nextPlayer + " turn in").width / 2), canvas.height / 3);
    context.fillText("3", (canvas.width / 2) - (context.measureText("3").width / 2), canvas.height * 2 / 3);
    let waitTime3 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    });
    let waitTime2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    });
    let waitTime1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 3000)
    });

    waitTime3.then(() => {
        clearScreen(context);

        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Impact";
        context.fillStyle = "#feebeb";
        context.fillText("Player " + nextPlayer + " turn in", (canvas.width / 2) - (context.measureText("Player " + nextPlayer + " turn in").width / 2), canvas.height / 3);
        context.fillText("2", (canvas.width / 2) - (context.measureText("2").width / 2), canvas.height * 2 / 3);
    })

    waitTime2.then(() => {
        clearScreen(context);
        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Impact";
        context.fillStyle = "#feebeb";
        context.fillText("Player " + nextPlayer + " turn in", (canvas.width / 2) - (context.measureText("Player " + nextPlayer + " turn in").width / 2), canvas.height / 3);
        context.fillText("1", (canvas.width / 2) - (context.measureText("1").width / 2), canvas.height * 2 / 3);
    })

    waitTime1.then(() => {
        clearScreen(context);
    })
}

/**
 * @description
 * @param {Object} context - global context variable for drawing
 * @param {Object} canvas - canvas variable
 * @param {number} winner - Value for the winner, either 1 or 2 depending on which player wins
 * @pa
 */
function gameOver(context, canvas, winner) {
    clearScreen(context);
    context.fillStyle = "Black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img_gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    if (winner == 1) {

        context.drawImage(img_p1Win, (canvas.width / 2) - (3 * p1width), canvas.height / 4, p1width * 6, p1height * 6);
    } else if (winner == 2) {
        
        context.drawImage(img_p2Win, (canvas.width / 2) - (3 * p2width), canvas.height / 4, p2width * 6, p2height * 6);
    }
    



}

/**
 * @description Draws grids and labels for the grids
 * @param {Object} context - global context variable for drawing
 * @param {Object} grid - variable for the grids
 */
function drawGrid(context, grid) {
    context.beginPath();
    context.moveTo(grid.rightmost, grid.heightmost);
    context.lineTo(grid.rightmost, grid.heightleast);
    context.stroke();

    context.beginPath();
    context.moveTo(grid.leftmost, grid.heightmost);
    context.lineTo(grid.leftmost, grid.heightleast);
    context.stroke();

    context.beginPath();
    context.moveTo(grid.rightmost, grid.heightmost);
    context.lineTo(grid.leftmost, grid.heightmost);
    context.stroke();

    context.beginPath();
    context.moveTo(grid.rightmost, grid.heightleast);
    context.lineTo(grid.leftmost, grid.heightleast);
    context.stroke();



    for (let i = 1; i < 10; i++) {
        context.beginPath();
        context.moveTo(grid.rightmost + grid.totalwidth * i / 10, grid.heightmost);
        context.lineTo(grid.rightmost + grid.totalwidth * i / 10, grid.heightleast);
        context.stroke();

        context.font = "20px Impact";
        context.fillStyle = "Black";
        context.fillText(i, grid.rightmost-(grid.totalwidth/18), grid.heightmost  +(grid.totalheight*(i/9) -(grid.totalheight/9*.25))  );
        
    }

    for (let i = 0; i < 10; i++) {
        context.beginPath();
        context.moveTo(grid.rightmost, grid.heightmost + grid.totalheight * i / 9);
        context.lineTo(grid.leftmost, grid.heightmost + grid.totalheight * i / 9);
        context.stroke();

        //adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
        context.font = "20px Impact";
        context.fillStyle = "Black";
        context.fillText(String.fromCharCode(65+i), grid.rightmost + grid.totalwidth*(i/10) + grid.totalwidth/27, grid.heightmost - (grid.totalheight/45));
    }
}



/**
 * @description Tracks and updates based on ships that are hit or missed. Red = hit, blue = miss, grey = ships at grid spot
 * @param {Object} context - global context variable for drawing
 * @param {number[]} arr - variable for the array for tracking ships, hits and misses
 * @param {Object} grid - grid variable
 * @param {boolean} ownShips - variable for tracking your own ships
 */
function renderShips(context, arr, grid, ownShips)
{
    drawGrid(context, grid);
    for (let i=0; i < 90; i++)
    {
        if (arr[i] == 0)
        {
            
        }
        else if (arr[i] == 1 && ownShips)
        {
            context.fillStyle = "Grey";
            context.fillRect(grid.rightmost + ((grid.totalwidth/10) /4 ) + (grid.totalwidth/10)*unflattenX(i) , grid.heightmost + ((grid.totalheight/10) /4 ) +  (grid.totalheight/9)*unflattenY(i), (grid.totalheight/10)/2, (grid.totalheight/9)/2 );
        }
        else if (arr[i] == 2)
        {
            context.fillStyle = "Red";
            context.fillRect(grid.rightmost + ((grid.totalwidth/10) /4 ) + (grid.totalwidth/10)*unflattenX(i) , grid.heightmost + ((grid.totalheight/10) /4 ) +  (grid.totalheight/9)*unflattenY(i), (grid.totalheight/10)/2, (grid.totalheight/9)/2 );
        }
        else if (arr[i] == 3)
        {
            context.fillStyle = "Blue";
            context.fillRect(grid.rightmost + ((grid.totalwidth/10) /4 ) + (grid.totalwidth/10)*unflattenX(i) , grid.heightmost + ((grid.totalheight/10) /4 ) +  (grid.totalheight/9)*unflattenY(i), (grid.totalheight/10)/2, (grid.totalheight/9)/2 );
        }
    }
}
