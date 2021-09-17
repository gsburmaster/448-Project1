//EXAMPLE STUFF FOR TESTING
let testData = {
    currentPlayer: 2,
    winner: "2",
    shipNumber: 2,
    gameStart: false,
    player1arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player1earr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2earr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    //winner is a char
}




/*LIST OF TODOS:
Finish Start Screen
Finish ship drawing (silver unhit, red hit)
Fix 2d Array into 1D array on click
document functions
*/





//portions adapted from https://github.com/gsburmaster/Connect4
let canvas;
let context;
let mode;

//adapted from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
let gameLogo = new Image();
gameLogo.src = 'Images/battleship.png';
let logowidth = 107;
let logoheight = 23;

let startButton = new Image();
startButton.src = 'Images/start.png';
let startwidth = 71;
let startheight = 22;

let p1Win = new Image();
p1Win.src = 'Images/player1.png';
let p1width = 89;
let p1height = 59;

let p2Win = new Image();
p2Win.src = 'Images/player2.png';
let p2width = 89;
let p2height = 59;

let submit = new Image();
submit.src = 'Images/submit.png';
let submitwidth = 81;
let submitheight = 21;

let fire = new Image();
fire.src = 'Images/fire.png';
let firewidth = 50;
let fireheight = 20;

let enemysea = new Image();
enemysea.src = 'Images/enemysea.png';
let eseawidth = 125;
let eseaheight = 23;

let mysea = new Image();
mysea.src = 'Images/mysea.png';
let mseawidth = 82;
let mseaheight = 23;

function render(arr1, arr2, data) {


    // check to see if we are in the start menu, game over, or gameplay phase
    startScreen(testData);
    clearScreen();
    gameplay(1,2,3);
    //gameOver(testData);
    //gameplay(arr1,arr2,data);

}


function gameplay(arr1, arr2, data) {
    mode = "game";
    if (data.gameStart == false) {
        startScreen(data);
    }

    //ingame logic (impliment if else later)
    gameLogo.onload = function () {
        context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    }


    renderOwnBoard(1);
    renderEnemyBoard(1);
}


function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function startScreen(data) {
    gameLogo.onload = function () {
        context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    }
    mode = "start";




    drawGrid("c");

   
}


//portions adapted from //https://github.com/gsburmaster/Connect4/blob/main/connect-four.js
// and https://www.w3schools.com/tags/canvas_measuretext.asp
//changes currentPlayer var in data
function switchTurn(data) {
    clearScreen();
    if (data.currentPlayer == 1) {
        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Impact";
        context.fillStyle = "#feebeb";
        context.fillText("Player 2 turn in", (canvas.width / 2) - (context.measureText("Player 2 turn in").width / 2), canvas.height / 3);
        context.fillText("3", (canvas.width / 2) - (context.measureText("3").width / 2), canvas.height * 2 / 3);
        var waitTime3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        var waitTime2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
        var waitTime1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })

        waitTime3.then(() => {
            clearScreen();
            context.fillStyle = "Black";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Impact";
            context.fillStyle = "#feebeb";
            context.fillText("Player 2 turn in", (canvas.width / 2) - (context.measureText("Player 2 turn in").width / 2), canvas.height / 3);
            context.fillText("2", (canvas.width / 2) - (context.measureText("2").width / 2), canvas.height * 2 / 3);
        })

        waitTime2.then(() => {
            clearScreen();
            context.fillStyle = "Black";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Impact";
            context.fillStyle = "#feebeb";
            context.fillText("Player 2 turn in", (canvas.width / 2) - (context.measureText("Player 2 turn in").width / 2), canvas.height / 3);
            context.fillText("1", (canvas.width / 2) - (context.measureText("1").width / 2), canvas.height * 2 / 3);
        })

        waitTime1.then(() => {
            data.currentPlayer = 2;
            clearScreen();
        })
    } else {
        context.fillStyle = "Black";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Impact";
        context.fillStyle = "#feebeb";
        context.fillText("Player 1 turn in", (canvas.width / 2) - (context.measureText("Player 1 turn in").width / 2), canvas.height / 3);
        context.fillText("3", (canvas.width / 2) - (context.measureText("3").width / 2), canvas.height * 2 / 3);
        var waitTime3 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        var waitTime2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 2000)
        })
        var waitTime1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        })

        waitTime3.then(() => {
            clearScreen();
            context.fillStyle = "Black";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Impact";
            context.fillStyle = "#feebeb";
            context.fillText("Player 1 turn in", (canvas.width / 2) - (context.measureText("Player 1 turn in").width / 2), canvas.height / 3);
            context.fillText("2", (canvas.width / 2) - (context.measureText("2").width / 2), canvas.height * 2 / 3);
        })

        waitTime2.then(() => {
            clearScreen();
            context.fillStyle = "Black";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Impact";
            context.fillStyle = "#feebeb";
            context.fillText("Player 1 turn in", (canvas.width / 2) - (context.measureText("Player 1 turn in").width / 2), canvas.height / 3);
            context.fillText("1", (canvas.width / 2) - (context.measureText("1").width / 2), canvas.height * 2 / 3);
        })

        waitTime1.then(() => {
            data.currentPlayer = 1;
            clearScreen();
        })
    }



}





//takes in the array to render ships
function renderOwnBoard(arr) {
    drawGrid("r");
}


function renderEnemyBoard(arr) {
    drawGrid("l");
}


//checks based on data.winnner (char)
//no reset
function gameOver(data) {
    clearScreen();
    context.fillStyle = "Black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    gameLogo.onload = function () {
        context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    }
        context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    if (data.winner == "1") {
        p1Win.onload = function () {
            context.drawImage(p1Win, (canvas.width / 2) - (3 * p1width), canvas.height / 4, p1width * 6, p1height * 6);
        }
        context.drawImage(p1Win, (canvas.width / 2) - (3 * p1width), canvas.height / 4, p1width * 6, p1height * 6);
    } else if (data.winner == "2") {
        p2Win.onload = function () {
            context.drawImage(p2Win, (canvas.width / 2) - (3 * p2width), canvas.height / 4, p2width * 6, p2height * 6);
        }
        context.drawImage(p2Win, (canvas.width / 2) - (3 * p2width), canvas.height / 4, p2width * 6, p2height * 6);
    }
    



}


function drawGrid(side) {
    let rightmost;
    let leftmost;
    let heightmost;
    let heightleast;
    let totalwidth;
    let totalheight;
    if (side == "r") {
        rightmost = canvas.width / 10;
        leftmost = rightmost * 4;
        heightmost = canvas.height / 4;
        heightleast = heightmost * 3;
        totalwidth = leftmost - rightmost;
        totalheight = heightleast - heightmost;


        //DRAWS a line in the middle of the screen
        //TEST: REMOVE LATER
        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();


        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(rightmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(leftmost, heightmost);
        context.lineTo(leftmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(leftmost, heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightleast);
        context.lineTo(leftmost, heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost + totalwidth * i / 10, heightmost);
            context.lineTo(rightmost + totalwidth * i / 10, heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, rightmost-(totalwidth/18),heightmost  +(totalheight*(i/9) -(totalheight/9*.25))  );
            
        }

        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 9);
            context.lineTo(leftmost, heightmost + totalheight * i / 9);
            context.stroke();
        }

        //adapted from https://github.com/gsburmaster/Connect4
        //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
        document.addEventListener("click", click1 => {
            if (mode == "start") {
                return;
            }
            pos = getXY(canvas, click1);
            const [i, j, k] = [RoundClickX(pos.x, totalwidth, rightmost), RoundClickY(pos.y, totalheight, heightmost), side]
            if (i < 0 || i > 9 || j < 0 || j > 8) {
                return;
            }

            console.log(flatten(i,j) +"\nR event Listener");
        })

    } else if (side == "l") {
        rightmost = (canvas.width / 10) * 6;
        leftmost = rightmost + 3 * (canvas.width / 10);
        heightmost = canvas.height / 4;
        heightleast = heightmost * 3;
        totalwidth = leftmost - rightmost;
        totalheight = heightleast - heightmost;

        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(rightmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(leftmost, heightmost);
        context.lineTo(leftmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(leftmost, heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightleast);
        context.lineTo(leftmost, heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost + totalwidth * i / 10, heightmost);
            context.lineTo(rightmost + totalwidth * i / 10, heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, rightmost-(totalwidth/18),heightmost  +(totalheight*(i/9) -(totalheight/9*.25))  );
            
        }

        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 9);
            context.lineTo(leftmost, heightmost + totalheight * i / 9);
            context.stroke();
        }
        //adapted from https://github.com/gsburmaster/Connect4
        //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
        document.addEventListener("click", click1 => {
            if (mode == "start") {
                return;
            }
            pos = getXY(canvas, click1);
            const [i, j, k] = [RoundClickX(pos.x, totalwidth, rightmost), RoundClickY(pos.y, totalheight, heightmost), side]
            if (i < 0 || i > 9 || j < 0 || j > 8) {
                return;
            }
            console.log(flatten(i,j)+ "\nL event Listener");
        })

    } else if (side == "c") {
        rightmost = (canvas.width / 10) * 3.5;
        leftmost = rightmost + 3 * (canvas.width / 10);
        heightmost = canvas.height / 4;
        heightleast = heightmost * 3;
        totalwidth = leftmost - rightmost;
        totalheight = heightleast - heightmost;




        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(rightmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(leftmost, heightmost);
        context.lineTo(leftmost, heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightmost);
        context.lineTo(leftmost, heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(rightmost, heightleast);
        context.lineTo(leftmost, heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost + totalwidth * i / 10, heightmost);
            context.lineTo(rightmost + totalwidth * i / 10, heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, rightmost-(totalwidth/18),heightmost  +(totalheight*(i/9) -(totalheight/9*.25))  );
            
        }

        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 9);
            context.lineTo(leftmost, heightmost + totalheight * i / 9);
            context.stroke();
        }
        
    }
    //adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (mode != "start") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j, k] = [RoundClickX(pos.x, totalwidth, rightmost), RoundClickY(pos.y, totalheight, heightmost), side]
        if (i < 0 || i > 9 || j < 0 || j > 8) {
            return;
        }
        console.log(flatten(i,j) + "\nC event Listener");
    })
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



//taken from https://github.com/gsburmaster/Connect4
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext('2d');


    //from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    render(1, 2, 3);
})

//taken from https://github.com/gsburmaster/Connect4
function RoundClickX(x, relSize, most) {
    return (Math.ceil((x - most) / (relSize / 10)) - 1)
}

function RoundClickY(y, relSize, most) {
    return (Math.ceil((y - most) / (relSize / 9) )-1)
}

//copied from https://stackoverflow.com/questions/1730961/convert-a-2d-array-index-into-a-1d-index
//takes a 9x10 2d and returns 1d index
function flatten(i,j)
{
        return (j*10 + i);
}