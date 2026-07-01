document.querySelector("button").addEventListener("click",function(){
    let randomNumber = Math.floor(Math.random()*100+1);
    document.querySelector(".number").innerHTML = randomNumber;
})
