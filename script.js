const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const penColor = document.querySelector(".pen-color");
const bgColorBtn = document.querySelector(".background-color");
const clrBtn = document.querySelector("#clear");
const shadeMdBtn = document.querySelector("#shade-btn");
const colorMdBtn = document.querySelector("#pen-btn");
const rainbowMdBtn = document.querySelector("#rainbow-btn");
const eraserMdBtn = document.querySelector("#eraser-btn");
const span = document.querySelector("#cur-size-span");

let currentColor = "black"
let bgColor = "black";
let option = 0 // 0: color mode, 1: rainbow, 2: shade, 3: eraser


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


createGrid(slider.value);

/* BUTTONS */
colorMdBtn.addEventListener("click", () => {
    option = 0; 
});

rainbowMdBtn.addEventListener("click", () => {
    option = 1;
});

shadeMdBtn.addEventListener("click", () => {
    option = 2; 

});

eraserMdBtn.addEventListener("click", () => {
    option = 3;
});

clrBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    createGrid(slider.value);
});


penColor.addEventListener("input", () =>{
   currentColor = penColor.value; 
});


slider.addEventListener("input", () =>{
    grid.innerHTML = "";
    createGrid(slider.value);
});


grid.addEventListener("mouseover", (event)=>{

    
    if(event.target && event.target.classList.contains("cell") && mouseDown == true) {
        if(option === 0){
            event.target.style.backgroundColor = currentColor;
            event.target.style.opacity = 1.0;
        } else if(option === 1){
            event.target.style.backgroundColor = getRainbowColor();
        } else if(option === 2){
            var curOpacity = window.getComputedStyle(event.target).opacity;
            curOpacity -= 0.1;
            curOpacity += 0.1;
            console.log(curOpacity);
            if(curOpacity < 1.0){
                event.target.style.opacity = curOpacity + 0.1;

            }

        } else {
            event.target.style.backgroundColor = bgColor;           
        }
    }
});


function createGrid(x){
    for(let i = 0; i < x; i++){
        const column = document.createElement("div");
        column.className = "column";

        for(let j = 0; j < x; j++){
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.classList.add("opaque");
            cell.style.backgroundColor = bgColor;
            column.appendChild(cell);
        }
        grid.appendChild(column);
    }

    span.textContent = `${x} x ${x}`;
}

function getRainbowColor(){
    let index = Math.floor(Math.random() * 13);
    let colorArray = ["rgb(255,0,0)","rgb(255,127,0)","rgb(255,255,0)","rgb(127,255,0)","rgb(0,255,0)","rgb(0,255,127)","rgb(0,255,255)","rgb(0,127,255)","rgb(0,0,255)","rgb(127,0,255)","rgb(255,0,255)","rgb(255,0,127)"];
    return colorArray[index];
}
