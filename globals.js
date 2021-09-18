//Basic game data
//Note other 2 arrays for tracking hits and misses havent been added
//Planned on 0 = empty, 1 = ship placed (un-hit), 2 = hit ship, 3 = miss
//EX: [0,0,1,1,2,1,0]
let gameData = {

    currentPlayer: 1,
    shipNumber: 1,
    winner: 0,
    gameStart: false,
    isWon: false,
    player1arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

//EXAMPLE STUFF FOR TESTING
let testData = {
    currentPlayer: 1,
    winner: 0,
    maxShips: 1,
    currShipLength: 1,
    currShipRotation: 0,
    gameStart: false,
    player1arr: [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2arr: [2, 2, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    mousePos: -1,
    prevMousePos: -1,
}


//taken from https://github.com/gsburmaster/Connect4
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext('2d');


    //from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    //this is how you have to do this don't ask why please
    rightGrid = setRightGrid();
    leftGrid = setLeftGrid();
    centerGrid = setCenterGrid();

    //https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded
    //from there^
    //starts game after images are loaded.
    Promise.all(Array.from([rotate,mysea,enemysea,fire,submit,p2Win,p1Win,startButton,gameLogo]).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        window.requestAnimationFrame(gameplayLoop);
    });
    
    rightsideClickEventRegister();
    centerClickEventRegister();
})

//portions adapted from https://github.com/gsburmaster/Connect4
let canvas;
let context;
let mode = "game";
let rotateFace;
let potMove = '';

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
function flatten(i,j)
{
        return (j*10 + i);
}

//takes a 1d index and returns 2d coords
//makes it easier to render ships with an x and a y
function unflattenY(i)
{
    return(Math.floor(i/10));
}
function unflattenX(i)
{
    return(i%10);
}

//takes a 1d index and returns the GRID POS (eg E4, A9) as a string
//does NOT return index for 2d array 
//used to get coord for showPotMove() or whatever the function is called
function unflattenToCoords(i)
{
    return(String.fromCharCode(65+(i%10)) +  (Math.floor(i/10) + 1));
}

//These TWO functions take an eventlistener click and return a rounded 2d array index (x or y respectively)
//taken from https://github.com/gsburmaster/Connect4
function RoundClickX(x, relSize, most) {
    return (Math.ceil((x - most) / (relSize / 10)) - 1)
}

function RoundClickY(y, relSize, most) {
    return (Math.ceil((y - most) / (relSize / 9) )-1)
}

//taken from https://github.com/gsburmaster/Connect4
//adjusting mouse pointer data because of relative positioning of centered div
//copied from https://stackoverflow.com/questions/29501447/why-does-css-centering-mess-up-canvas-mouse-coordinates/29501632
function getXY(canvas, event) {
    var rect = canvas.getBoundingClientRect(); // absolute position of canvas
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

function rightsideClickEventRegister() {
    //adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
    if (mode == "start") {
        return;
    }
    pos = getXY(canvas, click1);
    const [i, j, k] = [RoundClickX(pos.x, rightGrid.totalwidth, rightGrid.rightmost), RoundClickY(pos.y, rightGrid.totalheight, rightGrid.heightmost), "r"]
    if (i < 0 || i > 9 || j < 0 || j > 8) {
        return;
    }

    console.log(flatten(i,j) +"\nR event Listener");
    })
}

function centerClickEventRegister() {
	//adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (mode != "start") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j, k] = [RoundClickX(pos.x, centerGrid.totalwidth, centerGrid.rightmost), RoundClickY(pos.y, centerGrid.totalheight, centerGrid.heightmost), "c"]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        console.log(flatten(i,j) + "\nC event Listener");
    })
}

function centerMouseMoveEventListener() {
	//adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener('mousemove', e => {
        if (mode != "start") {
            return;
        }
        pos = getXY(canvas, e);
        const [i, j, k] = [RoundClickX(pos.x, centerGrid.totalwidth, centerGrid.rightmost), RoundClickY(pos.y, centerGrid.totalheight, centerGrid.heightmost), "c"]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        testData.prevMousePos = testData.mousePos;
        testData.mousePos = flatten(i,j);
        if (testData.mousePos != testData.prevMousePos) {
            console.log(testData.mousePos);
        }
    })
}