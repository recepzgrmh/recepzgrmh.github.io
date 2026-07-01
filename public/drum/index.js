document.addEventListener("keydown",function(e){
        var pressAudio = new Audio("sounds/"+e.key+".mp3");
        pressAudio.play();
        buttonAnimation(e.key);
    }
);

function handleClick(){
    var audio = new Audio("sounds/"+this.innerHTML+".mp3");
    audio.play();
    console.log(this.textContent);
    buttonAnimation(this.innerHTML);
}

function buttonAnimation(buttonPressed){
    var currentKey = document.querySelector("." + buttonPressed);

    currentKey.classList.add("pressed");

    const myTimeout = setTimeout(press, 100);

    function press() {
            currentKey.classList.remove("pressed");
    }
}

var numberOfButtons = document.querySelectorAll(".drum").length;

for(var i = 0 ; i < numberOfButtons;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click",handleClick);
}