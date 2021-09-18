//EXAMPLE STUFF FOR TESTING
let testData = {
    currentPlayer: 2,
    winner: "2",
    shipNumber: 2,
    gameStart: false,
    player1: {
    player1arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player1earr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    player2: {
    player2arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    player2earr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    //winner is a char
}




/*LIST OF TODOS:
Finish Start Screen
Finish Gameplay screen
Finish ship drawing (silver unhit, red hit)
document functions


Event Listeners for buttons are not coded
(I think you wanted to do it separately Logan?)
for the potential move, there is a method in here for clearing potential move, rendering potential move , a var called potMove, and a method for turning a 1d array index into the 2d corresponding coordinate (E4 or J9).
that stuff should have to happen in the event listener


*/








//portions adapted from https://github.com/gsburmaster/Connect4
let canvas;
let context;
let mode;
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
function setRightGrid()
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

function setLeftGrid()
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

let rotate = new Image();
rotate.src = 'Images/rotate.png';
let rotatewidth = 83;
let rotateheight = 19;







//this is the main render function. It spins up the whole game when it starts. 
// it also has access to all the game data in case it needs to be passed to subsequent functions. 
//effectively the executive function of rendering
function render(player1, player2, data) {


    // check to see if we are in the start menu, game over, or gameplay phase
    startScreen(testData);
    clearScreen();
    gameplay(1,2,3);
    //gameOver(testData);
    //gameplay(arr1,arr2,data);

}



//this is the gameplay render function. it is the both grids showing,"fire" screen. 
//it takes in player1, player2, and data 
//also handles global potMove, which lets me update what move is queued up
function gameplay(player1, player2, data) {
    mode = "game";
    if (data.gameStart == false) {
        startScreen(data);
    }

        //DRAWS a line in the middle of the screen
        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();


        context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
        context.drawImage(mysea,canvas.width/4 - mseawidth*3/2,canvas.height/6 - mseaheight*1.75,mseawidth*3,mseaheight*3);
        context.drawImage(enemysea,canvas.width -canvas.width/4 - eseawidth*3/2,canvas.height/6 - eseaheight*1.75,eseawidth*3,eseaheight*3);
        context.drawImage(fire,canvas.width*3/4-firewidth*3/2,canvas.height-canvas.height/6,firewidth*3,fireheight*3);

        if (data.currentPlayer == 1)
        {
            renderOwnBoard(player1);
            renderEnemyBoard(player1);    
        }
        else
        {
            renderOwnBoard(player2);
            renderEnemyBoard(player2);
        }

        showPotMove();


}


//call this everytime you update potMove from the click event listener and mode is game
function showPotMove()
{
        context.font = "40px Impact";
        context.fillStyle = "#04084b"; //color of navy in mysea.png. could update to fix colors later
        context.fillText("Potential move: " + potMove,canvas.width/4 - (context.measureText("Potential move: " + potMove).width / 2),canvas.height-canvas.height/8 );
}


//clears the bottom fifth of the left half of the gameplay screen so that the potential move can be reupdated with new potential moves upon a new click. 
//call this before showPotMove();
function clearPotMove()
{
    context.clearRect(0,canvas.height - canvas.height/5, canvas.width/2 - 1,canvas.height);
}


//self explanatory
function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function startScreen(data) {
   
   context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);

   
    context.drawImage(rotate, canvas.width - (canvas.width / 4) - (.5 * rotatewidth), canvas.height/2 - rotateheight/2, rotatewidth , rotateheight );
    
    
    context.drawImage(submit, canvas.width/2  -submitwidth, canvas.height - canvas.height/8 - submitheight/2, submitwidth *2, submitheight *2);

    
        


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
    context.drawImage(gameLogo, (canvas.width / 2) - (1.5 * logowidth), 0, logowidth * 3, logoheight * 3);
    if (data.winner == "1") {
        
        context.drawImage(p1Win, (canvas.width / 2) - (3 * p1width), canvas.height / 4, p1width * 6, p1height * 6);
    } else if (data.winner == "2") {
        
        context.drawImage(p2Win, (canvas.width / 2) - (3 * p2width), canvas.height / 4, p2width * 6, p2height * 6);
    }
    



}


function drawGrid(side) {
    
    if (side == "r") {
        
        context.beginPath();
        context.moveTo(rightGrid.rightmost, rightGrid.heightmost);
        context.lineTo(rightGrid.rightmost, rightGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(rightGrid.leftmost, rightGrid.heightmost);
        context.lineTo(rightGrid.leftmost, rightGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(rightGrid.rightmost, rightGrid.heightmost);
        context.lineTo(rightGrid.leftmost, rightGrid.heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(rightGrid.rightmost, rightGrid.heightleast);
        context.lineTo(rightGrid.leftmost, rightGrid.heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightGrid.rightmost + rightGrid.totalwidth * i / 10, rightGrid.heightmost);
            context.lineTo(rightGrid.rightmost + rightGrid.totalwidth * i / 10, rightGrid.heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, rightGrid.rightmost-(rightGrid.totalwidth/18),rightGrid.heightmost  +(rightGrid.totalheight*(i/9) -(rightGrid.totalheight/9*.25))  );
            
        }

        for (let i = 0; i < 10; i++) {
            context.beginPath();
            context.moveTo(rightGrid.rightmost, rightGrid.heightmost + rightGrid.totalheight * i / 9);
            context.lineTo(rightGrid.leftmost, rightGrid.heightmost + rightGrid.totalheight * i / 9);
            context.stroke();

            //adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(String.fromCharCode(65+i),rightGrid.rightmost + rightGrid.totalwidth*(i/10) + rightGrid.totalwidth/27,rightGrid.heightmost - (rightGrid.totalheight/45));
        }

        //adapted from https://github.com/gsburmaster/Connect4
        //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
        document.addEventListener("click", click1 => {
            if (mode == "start") {
                return;
            }
            pos = getXY(canvas, click1);
            const [i, j, k] = [RoundClickX(pos.x, rightGrid.totalwidth, rightGrid.rightmost), RoundClickY(pos.y, rightGrid.totalheight, rightGrid.heightmost), side]
            if (i < 0 || i > 9 || j < 0 || j > 8) {
                return;
            }

            console.log(flatten(i,j) +"\nR event Listener");
            console.log(unflattenToCoords(flatten(i,j)) + "bruh");
        })

    } else if (side == "l") {
        

        context.beginPath();
        context.moveTo(leftGrid.rightmost, leftGrid.heightmost);
        context.lineTo(leftGrid.rightmost, leftGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(leftGrid.leftmost, leftGrid.heightmost);
        context.lineTo(leftGrid.leftmost, leftGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(leftGrid.rightmost, leftGrid.heightmost);
        context.lineTo(leftGrid.leftmost, leftGrid.heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(leftGrid.rightmost, leftGrid.heightleast);
        context.lineTo(leftGrid.leftmost, leftGrid.heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(leftGrid.rightmost + leftGrid.totalwidth * i / 10, leftGrid.heightmost);
            context.lineTo(leftGrid.rightmost + leftGrid.totalwidth * i / 10, leftGrid.heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, leftGrid.rightmost-(leftGrid.totalwidth/18),leftGrid.heightmost  +(leftGrid.totalheight*(i/9) -(leftGrid.totalheight/9*.25))  );
            
        }

        for (let i = 0; i < 10; i++) {
            context.beginPath();
            context.moveTo(leftGrid.rightmost, leftGrid.heightmost + leftGrid.totalheight * i / 9);
            context.lineTo(leftGrid.leftmost, leftGrid.heightmost + leftGrid.totalheight * i / 9);
            context.stroke();

            //adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(String.fromCharCode(65+i),leftGrid.rightmost + leftGrid.totalwidth*(i/10) + leftGrid.totalwidth/27,leftGrid.heightmost - (leftGrid.totalheight/45));
        }
        //adapted from https://github.com/gsburmaster/Connect4
        //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
        document.addEventListener("click", click1 => {
            if (mode == "start") {
                return;
            }
            pos = getXY(canvas, click1);
            const [i, j, k] = [RoundClickX(pos.x, leftGrid.totalwidth, leftGrid.rightmost), RoundClickY(pos.y, leftGrid.totalheight, leftGrid.heightmost), side]
            if (i < 0 || i > 9 || j < 0 || j > 8) {
                return;
            }
            console.log(flatten(i,j)+ "\nL event Listener");
        })

    } else if (side == "c") {
        




        context.beginPath();
        context.moveTo(centerGrid.rightmost, centerGrid.heightmost);
        context.lineTo(centerGrid.rightmost, centerGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(centerGrid.leftmost, centerGrid.heightmost);
        context.lineTo(centerGrid.leftmost, centerGrid.heightleast);
        context.stroke();

        context.beginPath();
        context.moveTo(centerGrid.rightmost, centerGrid.heightmost);
        context.lineTo(centerGrid.leftmost, centerGrid.heightmost);
        context.stroke();

        context.beginPath();
        context.moveTo(centerGrid.rightmost, centerGrid.heightleast);
        context.lineTo(centerGrid.leftmost, centerGrid.heightleast);
        context.stroke();



        for (let i = 1; i < 10; i++) {
            context.beginPath();
            context.moveTo(centerGrid.rightmost + centerGrid.totalwidth * i / 10, centerGrid.heightmost);
            context.lineTo(centerGrid.rightmost + centerGrid.totalwidth * i / 10, centerGrid.heightleast);
            context.stroke();

            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(i, centerGrid.rightmost-(centerGrid.totalwidth/18),centerGrid.heightmost  +(centerGrid.totalheight*(i/9) -(centerGrid.totalheight/9*.25))  );
            
        }

        for (let i = 0; i < 10; i++) {
            context.beginPath();
            context.moveTo(centerGrid.rightmost, centerGrid.heightmost + centerGrid.totalheight * i / 9);
            context.lineTo(centerGrid.leftmost, centerGrid.heightmost + centerGrid.totalheight * i / 9);
            context.stroke();

            //adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode
            context.font = "20px Impact";
            context.fillStyle = "Black";
            context.fillText(String.fromCharCode(65+i),centerGrid.rightmost + centerGrid.totalwidth*(i/10) + centerGrid.totalwidth/27,centerGrid.heightmost - (centerGrid.totalheight/45));
        }
        
    }
    //adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (mode != "start") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j, k] = [RoundClickX(pos.x, centerGrid.totalwidth, centerGrid.rightmost), RoundClickY(pos.y, centerGrid.totalheight, centerGrid.heightmost), side]
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


    rightGrid = setRightGrid();
    leftGrid = setLeftGrid();
    centerGrid = setCenterGrid();

    //https://stackoverflow.com/questions/11071314/javascript-execute-after-all-images-have-loaded
    //from there^
    Promise.all(Array.from([rotate,mysea,enemysea,fire,submit,p2Win,p1Win,startButton,gameLogo]).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
        console.log(render(1, 2, 3));
    });


    
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

//takes a 1d index and returns 2d coords
//makes it easier to render ships with an x and a y
function unflatten(i)
{
    return(Math.floor(i/10), i%10);
}


//takes a 1d index and returns the GRID POS (eg E4, A9) as a string
//does NOT return index for 2d array 
//used to get coord for showPotMove() or whatever the function is called
function unflattenToCoords(i)
{
    return(String.fromCharCode(65+(i%10)) +  (Math.floor(i/10) + 1));
}



function renderShips(arr)
{

}