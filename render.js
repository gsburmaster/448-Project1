//portions adapted from https://github.com/gsburmaster/Connect4
let canvas;
let context;

//adapted from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
let gameLogo = new Image();
gameLogo.src = 'battleship.png';
let startButton = new Image();
startButton.src = 'start.png';

function render(arr1,arr2,data)
{
    // check to see if we are in the start menu, game over, or gameplay phase
    startScreen();

    renderOwnBoard(1);
    renderEnemyBoard(1);

}

function clearScreen()
{
    context.clearRect(0,0,canvas.width,canvas.height)

}


function startScreen()
{
    context.drawImage(gameLogo,640, 240);
    //TODO: use img.onLoad = new function () {} to get images to render
    //TODO: impliment dynamic scaling
}


function renderOwnBoard(arr)
{
        drawGrid("r");
}


function renderEnemyBoard(arr)
{

}

function gameOver(data)
{

}


function drawGrid(side)
{
    let rightmost;
    let leftmost;
    let heightmost;
    let heightleast;
    let totalwidth;
    let totalheight;
    if (side == "r")
    {
            rightmost = canvas.width/10;
            leftmost = rightmost * 4;
            heightmost = canvas.height/4;
            heightleast = heightmost*3;
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



            for (let i= 1;i < 7; i++)
            {
            context.beginPath();
            context.moveTo(rightmost+ totalwidth*i/6, heightmost);
            context.lineTo(rightmost+ totalwidth*i/6, heightleast);
            context.stroke();
            }

            for (let i= 1;i < 7; i++)
            {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight*i/6);
            context.lineTo(leftmost, heightmost + totalheight*i/6);
            context.stroke();
            }


    }
    else if (side == "l")
    {
       
    }
}

//taken from https://github.com/gsburmaster/Connect4
//adjusting mouse pointer data because of relative positioning of centered div
//copied from https://stackoverflow.com/questions/29501447/why-does-css-centering-mess-up-canvas-mouse-coordinates/29501632
function getXY(canvas, event) {
    var rect = canvas.getBoundingClientRect();  // absolute position of canvas
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

//adapted from https://github.com/gsburmaster/Connect4
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
document.addEventListener("click", click1 => {
    
    pos = getXY(canvas, click1);
    const [i,j] = [RoundClickX(pos.x),RoundClickY(pos.y)]
    let jmod = j;
    if (1 == 2)
    {
        return;
    }
    if (1 == 2)
    {
        return;
    }

    if (1 == 2)
    {
    return;
    }
})
//taken from https://github.com/gsburmaster/Connect4
//adapted from https://jayhawk-nation.web.app/examples/TicTacToe
document.addEventListener("DOMContentLoaded", () => {
    canvas = document.querySelector("#canvas");
    context = canvas.getContext('2d');
    render(1,2,3);
})
