let downBorder = 1;
let upBorder = 1000;
let number = Math.floor(Math.random()*(downBorder - upBorder)+upBorder);
let newPredict = 0;
let count = 0;

document.querySelector(".box").textContent = number;

document.querySelector("#down").addEventListener("click",function(){

    if(count === 0){
        upBorder = number;
        newPredict = Math.floor(Math.random()*(downBorder - upBorder)+upBorder);
    }
    else{
        upBorder = newPredict;
        newPredict = Math.floor(Math.random()*(downBorder - upBorder)+upBorder);
    }

    document.querySelector(".box").textContent = newPredict;

    count++;
});

document.querySelector("#up").addEventListener("click",function(){
    
     if(count === 0){
        downBorder = number;
        newPredict = Math.floor(Math.random()*(downBorder - upBorder)+upBorder);
    }
    else{
        downBorder = newPredict;
        newPredict = Math.floor(Math.random()*(downBorder - upBorder)+upBorder);
    }

    document.querySelector(".box").textContent = newPredict;

    count++;
});


document.querySelector("#okey").addEventListener("click",function(){
    document.querySelector(".title").innerHTML = "<h2>BİLDİMMM !!!!</h2> <p>Doğru Cevap : </p>";
    document.querySelector("#down").style.display = "none";
    document.querySelector("#up").style.display = "none";
    document.querySelector("#okey").style.display = "none";
})
