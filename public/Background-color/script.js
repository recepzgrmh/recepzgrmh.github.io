const title = document.querySelector("h1");
const color = document.querySelector(".container").style.backgroundColor = `rgb(0,0,0)`;
const click = document.querySelector("#click");
const reset = document.querySelector("#reset");
let change = document.querySelector(".container").style;

title.textContent = "Click Button to See Some Magic!";

click.addEventListener("click",function(){
    
    prevColor = document.querySelector(".container").style.backgroundColor;
    let random1 = Math.floor(Math.random()*255 + 0);
    let random2 = Math.floor(Math.random()*255 + 0);
    let random3 = Math.floor(Math.random()*255 + 0);   
    change.backgroundColor = `rgb(${random1},${random2},${random3})`;
    title.textContent = `Background Color: rgb(${random1},${random2},${random3})`;    
})

reset.addEventListener("click",function(){
    change.backgroundColor = `rgb(0,0,0)`;
    title.textContent = `Background Color: rgb(0,0,0)`
})





