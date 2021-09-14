function render(arr1, arr2, data) {


    // check to see if we are in the start menu, game over, or gameplay phase
    startScreen(testData);
    clearScreen();
    //gameplay(1,2,3);
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

    //TODO: impliment dynamic scaling
}


function renderOwnBoard(arr) {
    drawGrid("r");
}


function renderEnemyBoard(arr) {
    drawGrid("l");
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
            context.moveTo(rightmost + totalwidth * i / 9, heightmost);
            context.lineTo(rightmost + totalwidth * i / 9, heightleast);
            context.stroke();
        }

        for (let i = 1; i < 11; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 10);
            context.lineTo(leftmost, heightmost + totalheight * i / 10);
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
            if (i < 0 || i > 8 || j < 0 || j > 9) {
                return;
            }

            console.log(i + " " + j + " " + k + "\nR event Listener");
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
            context.moveTo(rightmost + totalwidth * i / 9, heightmost);
            context.lineTo(rightmost + totalwidth * i / 9, heightleast);
            context.stroke();
        }

        for (let i = 1; i < 11; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 10);
            context.lineTo(leftmost, heightmost + totalheight * i / 10);
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
            if (i < 0 || i > 8 || j < 0 || j > 9) {
                return;
            }
            console.log(i + " " + j + " " + k + "\nL event Listener");
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
            context.moveTo(rightmost + totalwidth * i / 9, heightmost);
            context.lineTo(rightmost + totalwidth * i / 9, heightleast);
            context.stroke();
        }

        for (let i = 1; i < 11; i++) {
            context.beginPath();
            context.moveTo(rightmost, heightmost + totalheight * i / 10);
            context.lineTo(leftmost, heightmost + totalheight * i / 10);
            context.stroke();
        }
        console.log("totalwidth = " + totalwidth);
        console.log("total height = " + totalheight);
        console.log('rightmost= ' + rightmost);
        console.log('heightmost= ' + heightmost);
    }
    //adapted from https://github.com/gsburmaster/Connect4
    //adapted from https://jayhawk-nation.web.app/examples/TicTacToe
    document.addEventListener("click", click1 => {
        if (mode != "start") {
            return;
        }
        pos = getXY(canvas, click1);
        const [i, j, k] = [RoundClickX(pos.x, totalwidth, rightmost), RoundClickY(pos.y, totalheight, heightmost), side]
        if (i < 0 || i > 8 || j < 0 || j > 9) {
            return;
        }
        console.log(i + " " + j + " " + k + "\nC event Listener");
    })
}

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