function Event(){
    var sound = new Audio("audio/"+this.innerText+".mp3");
    sound.play();
    buttonAnimation(this.innerText);
}   

function buttonAnimation(pressed){
    var currentKey = document.querySelector("." + pressed);

    currentKey.classList.add("change");

    const myTimeout = setTimeout(press, 100);

    function press() {
            currentKey.classList.remove("pressed");
    }
}

for(var i = 0 ; i < document.querySelectorAll(".display-grid").length ; i++){
    document.querySelectorAll(".display-grid")[i].addEventListener("click",Event);
}