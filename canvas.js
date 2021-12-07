let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedoTracker = []; // data
let track = 0; // represent which action from tracker array

let mouseDown = false;

// API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor; // change the color
tool.lineWidth = penWidth; // change the width of the drawing

// mousedown - start new path | mousemove - path fill or graphics
canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    });
    // tool.beginPath();
    // tool.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown) drawStroke({
        x: e.clientX,
        y: e.clientY,

        color: eraserFlag ? eraserColor : penColor,
        width: eraserFlag ? eraserWidth : penWidth
    });
    // if(mouseDown){
    //     tool.lineTo(e.clientX, e.clientY);
    //     tool.stroke();
    // }
});

canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;

    // UNDO REDO
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1;
});

// UNDO
undo.addEventListener("click", (e) => {
    if(track > 0) track--;

    // track action | action to be perform
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
});

// REDO
redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length - 1) track++;

    // track action | action to be perform
    let trackObj = {
        trackValue: track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
});

// UNDO REDO 
function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

// PENCIL COLOR
pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    });
});

// PENCIL WIDTH 
pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
});

// ERASER WIDTH
eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
});

// ERASER COLOR 
eraser.addEventListener("click", (e) => {
    if(eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
});

// DWONLOAD 
download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
});

// tool.beginPath(); // new graphic or path or line | after this call a new path will generate
// tool.moveTo(10, 10); // start point | from where to draw x-y
// tool.lineTo(100, 150); // end point | where to stop drawing x-y
// tool.stroke(); // fill color or fill graphic

// tool.strokeStyle = "red";
// tool.beginPath();
// tool.moveTo(10, 10);
// tool.lineTo(200, 200);
// tool.stroke();

