const grid = document.querySelector(".grid");
const slider = document.querySelector(".slider");
const penColor = document.querySelector(".pen-color");
const bgColorBtn = document.querySelector(".background-color");
const clrBtn = document.querySelector("#clear");
const shadeMdBtn = document.querySelector("#shade-btn");
const colorMdBtn = document.querySelector("#pen-btn");


let currentColor = "black"
let bgColor = (0,0,0,0.0);
let option = 0 // 0: color mode, 1: rainbow, 2: shade


let mouseDown = false;

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


createGrid(slider.value);
/* BUTTONS */
colorMdBtn.addEventListener("click", () => {
    console.log("color button clicked");
    option = 0; 
});




shadeMdBtn.addEventListener("click", () => {
    console.log("shade button clicked");
    option = 2; 
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
            console.log("color is bein painted");
        } else if(option === 1){
            console.log("ranbow is bein painted");
        } else {
            console.log("shade is being painted");
            let op = event.target.style.opacity + 0.1;
            event.target.style.backgroundColor = `rgba(0,0,0, ${op})`;
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
            column.appendChild(cell);
        }
        grid.appendChild(column);
    }
}



