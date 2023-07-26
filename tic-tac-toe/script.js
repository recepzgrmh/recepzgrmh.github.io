const cell = document.querySelectorAll(".cells");
const statusText = document.querySelector(".status");
const restartButton = document.querySelector("button");
const winStatus = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let emptyCells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "x";
statusText.innerHTML = `<p>${currentPlayer.toUpperCase()}'s Turn</p>` ;

cell.forEach((n,index) => {
    n.addEventListener("click",function(){
        n.textContent = currentPlayer;
        emptyCells[index] = currentPlayer;
        currentPlayer = currentPlayer === "x" ? "o" : "x";
        statusText.innerHTML = `<p>${currentPlayer.toUpperCase()}'s Turn</p>`;
    })
})



restartButton.addEventListener("click",function(){
    cell.forEach(n => n.textContent = "");
    emptyCells.forEach(n => n = "");
    currentPlayer = "x";
    statusText.innerHTML = `<p>${currentPlayer.toUpperCase()}'s Turn</p>`;
})
