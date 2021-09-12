//portions adapted from https://github.com/gsburmaster/Connect4
let canvas;
let context;



function render(arr1,arr2,data)
{
    // check to see if we are in the start menu, game over, or gameplay phase
    startScreen();
    alert("YO2");



}

function clearScreen()
{
    context.clearRect(0,0,canvas.width,canvas.height)

}


function startScreen()
{
    context.font = "82pt Arial";
    context.fillStyle = "red";
context.fillText("TEST",75,75);
alert("YO");
}


function renderOwnBoard(arr)
{

}


function renderEnemyBoard(arr)
{

}

function gameOver(data)
{

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
    canvas = document.querySelector("#Canvas");
    context = canvas.getContext('2d');
    render(1,2,9);
    alert("Test23")

})
