random = Math.floor(Math.random() * 6 + 1)
let img1 = document.querySelector(".img1").src = `assets/${random}.webp`

random2 = Math.floor(Math.random() * 6 + 1)
let img2 = document.querySelector(".img2").src = `assets/${random2}.webp`

document.querySelector("button").addEventListener("click", function () {
    random = Math.floor(Math.random() * 6 + 1)
    let img1 = document.querySelector(".img1").src = `assets/${random}.webp`

    random2 = Math.floor(Math.random() * 6 + 1)
    let img2 = document.querySelector(".img2").src = `assets/${random2}.webp`

    if (random > random2) {
        document.querySelector("main").lastElementChild.textContent = "Player 1 Won"
        document.querySelector("main").lastElementChild.classList.toggle("visible")
    }
    else if (random2 > random) {
        document.querySelector("main").lastElementChild.textContent = "Player 2 Won"
        document.querySelector("main").lastElementChild.classList.toggle("visible")
    }
    else {
        document.querySelector("main").lastElementChild.textContent = "DRAW"
        document.querySelector("main").lastElementChild.classList.toggle("visible")
    }

    if (document.querySelector("main").lastElementChild.classList.contains("visible")) {

        document.querySelector("button").textContent = "Refresh / Click to Roll the Dicee"

    }
    else {
        document.querySelector("button").textContent = "Reset"
    }
})

