
const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const penColor = document.querySelector(".pen-color");
const clrBtn = document.querySelector("#clear");
const shade = document.querySelector("#shade-btn");
const rainbow = document.querySelector("#rainbow-btn");
const eraser = document.querySelector("#eraser-btn");
const span = document.querySelector("#cur-size-span");

let currentColor = "black"
let bgColor = "white";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let shadeMdBtn = false;
let rainbowMdBtn = false; 
let eraserMdBtn= false; 

createGrid(slider.value);
//Buttons
shade.addEventListener("click", () => {
    shadeMdBtn = !shadeMdBtn;
    shade.classList.toggle("selected");
});

eraser.addEventListener("click", () => {
    eraserMdBtn = !eraserMdBtn;
    eraser.classList.toggle("selected");
});

rainbow.addEventListener("click", () => {
    rainbowMdBtn= !rainbowMdBtn;
    rainbow.classList.toggle("selected");
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
        if(eraserMdBtn){
            event.target.style.backgroundColor = bgColor;           
            event.target.style.opacity = 0;
       } else if(rainbowMdBtn || shadeMdBtn){
            if(rainbowMdBtn){
                event.target.style.backgroundColor = getRainbowColor();
            } else {
                event.target.style.backgroundColor = currentColor;
            }
            if(shadeMdBtn){
                var curOpacity = window.getComputedStyle(event.target).opacity;
                curOpacity -= 0.1;
                curOpacity += 0.1;
                if(curOpacity < 1.0){
                    event.target.style.opacity = curOpacity + 0.1;
                }
            } else {
                event.target.style.opacity = 1.0;
            }
        } else {
            event.target.style.backgroundColor = currentColor;
            event.target.style.opacity = 1.0;
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
