let optionsCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");

let pencilFlag = false;
let eraserFlag = false;

// true - tools show, flase - tools hide
let optionsFlag = true;

optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if(optionsFlag) openTools();
    else closeTools();
});

// OPEN
function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");

    toolsCont.style.display = "flex";
}

// CLOSE
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");

    toolsCont.style.display = "none";

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

// PENCIL
pencil.addEventListener("click", (e) => {
    // true - show pencil tool / false - hide pencil tool
    pencilFlag = !pencilFlag;

    if(pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";
});

// ERASER
eraser.addEventListener("click", (e) => {
    // true - show eraser tool / false - hide eraser tool
    eraserFlag = !eraserFlag;

    if(eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";
});

// UPLOAD 
upload.addEventListener("click", (e) => {
    // OPEN FILE EXPLORER
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src="${url}" />
            </div>
        `;
        createSticky(stickyTemplateHTML);
    });
        
});

// STICKY 

sticky.addEventListener("click", (e) => {
    let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

    createSticky(stickyTemplateHTML);
});

// sticky.addEventListener("click", (e) => {
    // let stickyCont = document.createElement("div");
    // stickyCont.setAttribute("class", "sticky-cont");
    // stickyCont.innerHTML = `
    //     <div class="header-cont">
    //         <div class="minimize"></div>
    //         <div class="remove"></div>
    //     </div>
    //     <div class="note-cont">
    //         <textarea></textarea>
    //     </div>
    // `;
    // document.body.appendChild(stickyCont);

    // // NOTE
    // let minimize = stickyCont.querySelector(".minimize");
    // let remove = stickyCont.querySelector(".remove");
    // noteActions(minimize, remove, stickyCont);

    // // DRAG & DROP 
    // stickyCont.onmousedown = function(event) {
    //    dragAndDrop(stickyCont, event);
    // };
    // stickyCont.ondragstart = function() {
    //     return false;
    // };
// });

// CREATE SCTICKY
function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    
    document.body.appendChild(stickyCont);

    // NOTE
    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);

    // DRAG & DROP 
    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };
    stickyCont.ondragstart = function () {
        return false;
    };
}

// STICKY - NOTE 
function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    });
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display === "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    });
}

// DRAG & DROP
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}