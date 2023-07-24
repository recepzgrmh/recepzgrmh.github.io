var circles = document.querySelectorAll(".circle");

var next = document.getElementById("next");
var prev = document.getElementById("prev");

var progress = document.getElementById("progress");


var currentActive = 1;

next.addEventListener("click",function(){
    currentActive++;

    if(currentActive > circles.length){
        currentActive = circles.length;
    }

    update();
    
})




prev.addEventListener("click",function(){
    currentActive--;

    if(currentActive < 1){
        currentActive = 1;
    }

    update();
})


function update(){
    circles.forEach((circle, index ) => {
        if(index < currentActive){
            circle.classList.add("active");
            
        }
        else{
            circle.classList.remove("active");
        }
    })


    var actives = document.querySelectorAll(".active");

    progress.style.width = ( (actives.length -1) / (circles.length -1)) * 100 + "%";

    
    if(actives.length === 1){
        prev.disabled = true;
    }
    else if(actives.length === circles.length){
        next.disabled = true;
    }
    else{
        prev.disabled = false;
        next.disabled = false;
    }
}