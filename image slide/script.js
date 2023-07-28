let buttonPrev = document.querySelector("#prev");
let buttonNext = document.querySelector("#next");
let image = document.querySelector(".image");
let imageSelector = 1;

buttonPrev.addEventListener("click",function(){
    prevImage();
})

buttonNext.addEventListener("click",function(){
    nextImage();
})


function prevImage(){
    if(imageSelector === 1){
        imageSelector = 16;
    }
    else{
        imageSelector--;
    }

    image.style.backgroundImage = `url(assets/${imageSelector}.jpg)`;
    console.log(imageSelector);
}



function nextImage(){
    if(imageSelector === 16){
        imageSelector = 1;
    }
    else{
        imageSelector++;
    }

    image.style.backgroundImage = `url(assets/${imageSelector}.jpg)`;

    console.log(imageSelector);
}