//Basic game data
let g_currentPlayer = 1;
let g_winner = 0;
let g_maxShips = 3;
let g_currShipLength = 1;
let g_currShipRotation = 0;
let g_player1arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let g_player2arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let g_mousePos = 0;
//portions adapted from https://github.com/gsburmaster/Connect4
let g_canvas;
let g_context;
let g_mode = "unstarted";
let g_potMove = '';

//taken from https://github.com/gsburmaster/Connect4
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
/**
 * @desc Wait for all files to be loaded before running scripts
 * @listens load
 */
window.addEventListener("load", () => {
    g_canvas = document.querySelector("#canvas");
    g_context = canvas.getContext('2d');


    //from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    g_context.mozImageSmoothingEnabled = false;
    g_context.webkitImageSmoothingEnabled = false;
    g_context.msImageSmoothingEnabled = false;
    g_context.imageSmoothingEnabled = false;

    //this is how you have to do this don't ask why please
    rightGrid = setRightGrid();
    leftGrid = setLeftGrid();
    centerGrid = setCenterGrid();
    
    rightsideClickEventRegister();
    centerClickEventRegister();
    centerMouseMoveEventRegister();
    startButtonRegister();
    rotateButtonRegister();
    
    window.requestAnimationFrame(gameplayLoop);
})

//refactoring grids into objects so that I can pass them around 
let rightGrid = {
    rightmost:0,
    leftmost:0,
    heightmost:0,
    heightleast:0,
    totalwidth:0,
    totalheight:0,
}
let leftGrid = {
    rightmost:0,
    leftmost:0,
    heightmost:0,
    heightleast:0,
    totalwidth:0,
    totalheight:0,
}
let centerGrid = {
    rightmost:0,
    leftmost:0,
    heightmost:0,
    heightleast:0,
    totalwidth:0,
    totalheight:0,
}

//https://stackoverflow.com/questions/4618541/can-i-reference-other-properties-during-object-declaration-in-javascript
/**
 * @name setLeftGrid
 * @function
 * @desc Sets left grid data
 */
function setLeftGrid()
{
        var Trightmost =  canvas.width / 10;
        var Tleftmost =  Trightmost * 4;
        var Theightmost = canvas.height / 4;
        var Theightleast = Theightmost * 3;
        var Ttotalwidth = Tleftmost - Trightmost;
        var Ttotalheight = Theightleast - Theightmost;

    return {
        rightmost:Trightmost ,
        leftmost: Tleftmost,
        heightmost:Theightmost ,
        heightleast: Theightleast,
        totalwidth:Ttotalwidth ,
        totalheight:Ttotalheight ,
    };
}

/**
 * @name setRightGrid
 * @function
 * @desc Sets right grid data
 */
function setRightGrid()
{
    var Trightmost=  (canvas.width / 10) * 6;
    var Tleftmost= Trightmost + 3 * (canvas.width / 10);
    var Theightmost= canvas.height / 4;
    var Theightleast= Theightmost * 3;
    var Ttotalwidth= Tleftmost - Trightmost;
    var Ttotalheight= Theightleast - Theightmost;
    
    return {
        rightmost:Trightmost ,
        leftmost: Tleftmost,
        heightmost:Theightmost ,
        heightleast: Theightleast,
        totalwidth:Ttotalwidth ,
        totalheight:Ttotalheight ,
    };
}

/**
 * @name setCenterGrid
 * @function
 * @desc Sets center grid data
 */
function setCenterGrid()
{
    var Trightmost= (canvas.width / 10) * 3.5;
    var Tleftmost= Trightmost + 3 * (canvas.width / 10);
    var Theightmost= canvas.height / 4;
    var Theightleast= Theightmost * 3;
    var Ttotalwidth= Tleftmost - Trightmost;
    var Ttotalheight= Theightleast - Theightmost;

    return {
        rightmost:Trightmost ,
        leftmost: Tleftmost,
        heightmost:Theightmost ,
        heightleast: Theightleast,
        totalwidth:Ttotalwidth ,
        totalheight:Ttotalheight ,
    };
}

//copied from https://stackoverflow.com/questions/1730961/convert-a-2d-array-index-into-a-1d-index
//takes a 9x10 2d and returns 1d index

/**
 * @name flatten
 * @function
 * @desc This function converts 2D coordinates into a 1D coordinate
 * @param {number} i the X coordinate to be converted
 * @param {number} j the Y coordinate to be converted
 */
function flatten(i,j)
{
        return (j*10 + i);
}

//takes a 1d index and returns 2d coords
//makes it easier to render ships with an x and a y
/**
 * @name unflattenY
 * @function
 * @desc This function converts a 1D coordinate to a Y value
 * @param {number} i the 1D coordinate to be converted
 */
function unflattenY(i)
{
    return(Math.floor(i/10));
}

/**
 * @name unflattenX
 * @function
 * @desc This function converts a 1D coordinate to an X value
 * @param {number} i the 1D coordinate to be converted
 */
function unflattenX(i)
{
    return(i%10);
}

//takes a 1d index and returns the GRID POS (eg E4, A9) as a string
//does NOT return index for 2d array 
//used to get coord for showPotMove() or whatever the function is called
/**
 * @name unflattenToCoords
 * @function
 * @desc This function converts a 1D coordinate to Battleship coordinates (not indices)
 * @param {number} i the 1D coordinate to be converted
 */
function unflattenToCoords(i)
{
    return(String.fromCharCode(65+(i%10)) +  (Math.floor(i/10) + 1));
}

//These TWO functions take an eventlistener click and return a rounded 2d array index (x or y respectively)
//taken from https://github.com/gsburmaster/Connect4

/**
 * @name RoundClickX
 * @function
 * @desc This function rounds mouseY to the grid
 * @param {number} x the x position of the mouse
 * @param {number} relSize the size of the grid
 * @param {number} most the edge of the grid
 */
function RoundClickX(x, relSize, most) {
    return (Math.ceil((x - most) / (relSize / 10)) - 1)
}

/**
 * @name RoundClickY
 * @function
 * @desc This function rounds mouseY to the grid
 * @param {number} y the y position of the mouse
 * @param {number} relSize the size of the grid
 * @param {number} most the edge of the grid
 */
function RoundClickY(y, relSize, most) {
    return (Math.ceil((y - most) / (relSize / 9) )-1)
}

//taken from https://github.com/gsburmaster/Connect4
//adjusting mouse pointer data because of relative positioning of centered div
//copied from https://stackoverflow.com/questions/29501447/why-does-css-centering-mess-up-canvas-mouse-coordinates/29501632

/**
 * @name getXY
 * @function
 * @desc This function gets mouse X and Y relative to canvas
 * @param {Object} canvas the canvas
 * @param {event} event the relevant event
 */
function getXY(canvas, event) {
    var rect = canvas.getBoundingClientRect(); // absolute position of canvas
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

/**
 * @name rightsideClickEventRegister
 * @function
 * @desc This function adds an event listener for firing
 * @listens click
 */
function rightsideClickEventRegister() {
    //adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (g_mode != "game") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j] = [RoundClickX(pos.x, rightGrid.totalwidth, rightGrid.rightmost), RoundClickY(pos.y, rightGrid.totalheight, rightGrid.heightmost)]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        
        if (g_currentPlayer == 1 && fire(g_player2arr, flatten(i,j))) {
            if (winCheck(g_player2arr)) {
                g_winner = 1;
                g_mode = "win";
            } else {
                switchPlayers("game");
            }
        } else if (g_currentPlayer == 2 && fire(g_player1arr, flatten(i,j))){
            if (winCheck(g_player2arr)) {
                g_winner = 2;
                g_mode = "win";
            } else {
                switchPlayers("game");
            }
        }
    })
}

/**
 * @name centerClickEventRegister
 * @function
 * @desc This function adds an event listener for clicking to place ships
 * @listens click
 */
function centerClickEventRegister() {
	//adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (g_mode != "start") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j] = [RoundClickX(pos.x, centerGrid.totalwidth, centerGrid.rightmost), RoundClickY(pos.y, centerGrid.totalheight, centerGrid.heightmost)]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        
        if (g_currentPlayer == 1) {
            newShips = placeShip(g_player1arr, g_mousePos, g_currShipLength, g_currShipRotation);
            if (!newShips.every((el, ix) => el === g_player1arr[ix])) {
                g_player1arr = newShips;
                g_currShipLength++;
            }
        } else if (g_currentPlayer == 2) {
            newShips = placeShip(g_player2arr, g_mousePos, g_currShipLength, g_currShipRotation);
            if (!newShips.every((el, ix) => el === g_player2arr[ix])) {
                g_player2arr = newShips;
                g_currShipLength++;
            }
        }
    })
}

/**
 * @name centerMouseMoveEventRegister
 * @function
 * @desc This function adds an event listener for mouse position when placing ships
 * @listens mousemove
 */
function centerMouseMoveEventRegister() {
	//adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener('mousemove', e => {
        if (g_mode != "start") {
            return;
        }
        pos = getXY(canvas, e);
        const [i, j] = [RoundClickX(pos.x, centerGrid.totalwidth, centerGrid.rightmost), RoundClickY(pos.y, centerGrid.totalheight, centerGrid.heightmost)]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        g_mousePos = flatten(i,j);
    })
}

/**
 * @name startButtonRegister
 * @function
 * @desc This function adds an event listener for the start button
 * @listens click
 */
function startButtonRegister() {
    document.getElementById("startButton").addEventListener('click', e => {
        if (g_mode == "unstarted") {
            g_maxShips = document.getElementById("number_of_ships").value;
            g_mode = "start";
        }
    });
}

/**
 * @name rotateButtonRegister
 * @function
 * @desc This function adds an event listener for the rotate button
 * @listens click
 */
function rotateButtonRegister() {
    document.getElementById("rotateButton").addEventListener('click', e => {
        if (g_currShipRotation == 0) {
            g_currShipRotation = 1;
        } else {
            g_currShipRotation = 0;
        }
    });
}